package Service;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import BD.FollowBD;
import Tools.UserTools;

public class Follow {
	public static JSONObject addFollow(String key, String id_followed) {
		JSONObject res = new JSONObject();
		try {
			if(UserTools.userConnected(key)) {
				if(FollowBD.addFollow(key, id_followed)) {
					res.put("code", 0);
				}
				else {
					return ServiceTools.serviceRefused("Already followed", -210);
				}
			}
			return res;
		}
		catch(SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error111", -200);
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
	
	public static JSONObject removeFollow(String key, String id_followed) {
		try {
			if(UserTools.userConnected(key)) {
				FollowBD.removeFollow(key, id_followed);
			}
			return new JSONObject();
		}
		catch(SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
		catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
	}
	
	public static JSONObject listFollowed(String key,String id_follower,String id_followed) {
		try {
			if(UserTools.userConnected(key)) {
				return FollowBD.listFollowed(key,id_follower,id_followed);
			}
			return new JSONObject();
		}
		catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
	}
}
