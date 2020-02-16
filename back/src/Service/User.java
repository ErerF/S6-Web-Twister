package Service;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import BD.FollowBD;
import BD.UserBD;
import Tools.UserTools;

public class User {
	
	public static JSONObject createUser(String nom,String prenom,String email,String username,String mdp) {
		//check si user deja exist
		//si oui, renvoie erreur
		//sinon, check xxxxxxxxxxxxxx
		//renvoie resultat au servlet
		if((email==null)||(mdp == null)||(nom == null)||(prenom == null)||(username==null)) {
			return ServiceTools.serviceRefused("Argument error", -1);
		}
				
		try {
			if(UserTools.UserExists(email)) {
				return ServiceTools.serviceRefused("User exists", -4);
			}
			
			//appele BD, creer user		
			//boolean bool=UserBD.addUser(email, username,mdp, nom, prenom);
			//if(!bool)
			UserBD.addUser(email, username,mdp, nom, prenom);			
		}
		catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}

		return UserBD.addConnexion(email);
	}

	public static JSONObject login(String email,String mdp) {
		//connect BD
				//appel BD, check email&mdp
		//JSONObject res = new JSONObject();
		if((email==null)||(mdp == null)) {
			return ServiceTools.serviceRefused("Argument absent", -1);
		}
		try {
			if(!UserTools.UserExists(email)) {
				return ServiceTools.serviceRefused("Unknown User", -2);
			}
			if(!UserTools.checkUserPsd(email, mdp)) {
				return ServiceTools.serviceRefused("Bad password", -3);
			}
			if(UserBD.verifConnexion(email)) {
				return ServiceTools.serviceRefused("Already connected", -7);
			}
			/*res.put("status", "OK");
			res.put("email", email);*/
			
		}/*catch(JSONException e) {
			return ServiceTools.serviceRefused("JSON error", -100);
		}*/catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
		
		return UserBD.addConnexion(email);
	}
	
	
	
	public static JSONObject logout(String key){
		try {
			if(UserTools.userConnected(key)){
				UserBD.deleteKey(key);
			}
			JSONObject res = new JSONObject();
			res.put("code",0);
			return res;
		}
		catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
		catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
	}
	
	
	
	public static JSONObject resetPassword(String email, String psd) {
		JSONObject res = new JSONObject();
		if((email==null)||(psd==null)){
			return ServiceTools.serviceRefused("Argument error", -1);
		}
		try {
			if(!UserTools.UserExists(email)) {
				return ServiceTools.serviceRefused("User not exists", -6);
			}
			UserBD.resetPwd(email, psd);
			res.put("code",0);
		}
		catch(SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
		catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		return res;
	}
	
	
	
	public static JSONObject nbUser() {
		JSONObject res = new JSONObject();
		try {
			res.put("code", 0);
			res.put("nbUser",UserBD.nomberUser());
		}
		catch(SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
		catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		return res;
	}
	
	
	
	
	public static JSONObject searchUser(String idUser, String key) {
		JSONObject res = new JSONObject();
		try {
			if(UserTools.userConnected(key)){
				res = UserBD.chercherUser(idUser);
				if(FollowBD.checkFollowed(key, idUser)) {
					res.put("followed",0);
				}
				else {
					res.put("followed",1);
				}
			}
			return res;
		} catch (UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		
	}
	
	public static JSONObject searchUsername(String username) {
		try {
			return UserBD.chercherUsername(username);
		} catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		} catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
	}
}
