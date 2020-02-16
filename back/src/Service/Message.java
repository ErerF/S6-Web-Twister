package Service;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import BD.Acces;
import BD.MessageBD;
import Tools.MessageTools;
import Tools.UserTools;

public class Message {

	public static JSONObject addMsg(String key,String msg) {		
		try {
			//JSONObject res=new JSONObject();
			if(UserTools.userConnected(key)) {
				return MessageBD.addMsg(key, msg);			
				//res.put("message", "ok");
				//res.put("code", 200);
			}			
			return new JSONObject();
		}
		catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
		catch(JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
	}
	
	public static JSONObject deleteMsg(String key,String id_msg) {
		//MsgNotExistError
		try {
			JSONObject res = new JSONObject();
			if(UserTools.userConnected(key) && MessageTools.checkAuthor(key, id_msg)){
				//System.out.println("in Message/delete");
				MessageBD.deleteMsg(id_msg);
				res.put("code", 0);
			}		
			//System.out.println("out Message/delete");
			return res;
		}
		catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
		catch(JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
	}
	
	public static JSONObject listMsgs(String key,String id_author) {
		try {
			if(UserTools.userConnected(key)) {
				return MessageBD.listMsgs(key,id_author);
			}
			
			return new JSONObject();
		}
		catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
		catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
	}
	
	public static JSONObject NombreMessages() {
		JSONObject res = new JSONObject();
		try {
			res.put("code", 0);
			res.put("nbMsgs", MessageBD.NbMsgs());
			return res;
		} catch (JSONException e) {
			return ServiceTools.serviceRefused("JSON error", -100);
		}
	}
}
