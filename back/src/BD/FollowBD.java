package BD;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.bson.json.JsonMode;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Service.ServiceTools;
import Service.UserUnconnectedException;
import Tools.UserTools;

public class FollowBD {
	
	
	public static boolean checkFollowed(String key, String idFollowed) throws SQLException, UserUnconnectedException {
		boolean check = true;
		String id_follower=UserTools.getIdUser(key);
		Connection conn = Acces.getMySQLConnection();
		String query = "SELECT id_followed FROM FOLLOW WHERE id_follower='"+id_follower+"';";
		Statement st = conn.createStatement();	
		ResultSet rs = st.executeQuery(query);
		while(rs.next()) {
			if(idFollowed.equals(rs.getString("id_followed"))) {
				check=false;
				break;
			}
		}
		st.close();
		conn.close();
		return check;
	}

	public static boolean addFollow(String key,String id_followed)throws SQLException,UserUnconnectedException{
		if(FollowBD.checkFollowed(key,id_followed)) {
			String id_follower=UserTools.getIdUser(key);
			
			Connection conn = Acces.getMySQLConnection();
			String query = "INSERT INTO FOLLOW VALUES('"+id_follower+"', '"+id_followed+"', DATE_FORMAT(NOW(),'%Y-%m-%d %T'));";
			Statement st = conn.createStatement();
			st.execute(query);
			st.close();
			conn.close();
			return true;
		}
		return false;
	}
	
	public static void removeFollow(String key, String id_followed)throws SQLException,UserUnconnectedException{
		String id_follower=UserTools.getIdUser(key);
		Connection conn = Acces.getMySQLConnection();
		String query = "DELETE FROM FOLLOW WHERE id_follower = '"+id_follower+"' AND id_followed = '"+id_followed+"' ";
		Statement st = conn.createStatement();
		st.execute(query);
		st.close();
		conn.close();
	}
	
	public static JSONObject listFollowed(String key,String id_follower,String id_followed){
		try {
			Connection conn = Acces.getMySQLConnection();
			Statement st = conn.createStatement();			
			String query="";
			JSONObject res=new JSONObject();
			
			if(id_followed.equals("")) {
				if(id_follower.equals(""))
					id_follower=UserTools.getIdUser(key);
				
				query = "SELECT id_followed,username,email FROM FOLLOW f,USERS u WHERE f.id_followed=u.idUser AND f.id_follower = '"+id_follower+"';";
				ResultSet rs = st.executeQuery(query);
				res.put("id_follower",id_follower);
				while(rs.next()) {
					JSONObject followed=new JSONObject();
					followed.put("id_followed", rs.getString("id_followed"));
					followed.put("username",rs.getString("username"));
					followed.put("email", rs.getString("email"));
					res.accumulate("followeds",followed);
				}		
			}
			else {
				if(!id_follower.equals(""))
					return ServiceTools.serviceRefused("Argument error", -1);
				else {
					query = "SELECT id_follower,username,email FROM FOLLOW f,USERS u WHERE f.id_follower=u.idUser AND f.id_followed = '"+id_followed+"';";
					ResultSet rs = st.executeQuery(query);
					res.put("id_followed",id_followed);
					while(rs.next()) {
						JSONObject follower=new JSONObject();
						follower.put("id_follower", rs.getString("id_follower"));
						follower.put("username",rs.getString("username"));
						follower.put("email", rs.getString("email"));
						res.accumulate("followers",follower);
					}	
				}
			}
			
			st.close();
			conn.close();
			return res;
		}
		catch (SQLException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
		catch(JSONException e) {
			return ServiceTools.serviceRefused("JSON error", -100);
		}catch(UserUnconnectedException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("User session already expired", -5);
		}
	}
}
