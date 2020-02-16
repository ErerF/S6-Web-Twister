package BD;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import Service.ServiceTools;

public class UserBD {
	
	/*public static ResultSet execute(String query) throws SQLException {
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		ResultSet rs = st.executeQuery(query);
		st.close();
		conn.close();
		return rs;
	}*/
	
	public static int nomberUser() throws SQLException{
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		String query = "SELECT idUser FROM USERS;";
		ResultSet rs = st.executeQuery(query);
		List<Integer> listUser = new ArrayList<Integer>();
		while(rs.next()) {
			listUser.add(rs.getInt("idUser"));
		}
		st.close();
		conn.close();
		return listUser.size();
	}
	
	public static void addUser(String email,String username, String psd, String nom, String prenom) throws SQLException{
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		
		String query = "INSERT INTO USERS VALUES(null, '"+email+"', '"+username+"', '"+psd+"', '"+prenom+"', '"+nom+"');";
		st.execute(query);
		st.close();
		conn.close();
		//BD.UserBD.execute(query);
	}

	/**
	 * @return key
	 * */
	public static JSONObject addConnexion(String email) {	
		JSONObject res = new JSONObject();
		
		String key="";
		try {
			//get idUser
			Connection conn = Acces.getMySQLConnection();		
			Statement st = conn.createStatement();
			String query = "SELECT idUser,username FROM USERS WHERE email = '"+email+"';";
			//ResultSet rs = BD.UserBD.execute(query);
			ResultSet rs = st.executeQuery(query);
			String idUser="";
			String userName="";
			while(rs.next()) {
				idUser = rs.getString("idUser");
				userName = rs.getString("username");
			}
			
			res.put("idUser",idUser);
			res.put("login",email);
			res.put("username", userName);
			res.put("code",0);
			
			//ajouter une session
			query = "INSERT INTO CONNECTIONS VALUES('"+idUser+"', null, DATE_ADD(DATE_FORMAT(NOW(),'%Y-%m-%d %T'),INTERVAL 10 HOUR))";
			st.execute(query);
			//BD.UserBD.execute(query);
			
			//get key
			query = "SELECT cle FROM CONNECTIONS WHERE idUser = '"+idUser+"';";
			//rs = BD.UserBD.execute(query);
			rs = st.executeQuery(query);
			while(rs.next()) {
				key = rs.getString("cle");
			}			
			res.put("key",key);

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
		}
	}
	
	public static boolean verifConnexion(String email) throws SQLException {
			Connection conn = Acces.getMySQLConnection();		
			Statement st = conn.createStatement();
			String query = "SELECT * FROM CONNECTIONS c, USERS u WHERE u.idUser = c.idUser AND email = '"+email+"';";
			//ResultSet rs = BD.UserBD.execute(query);
			ResultSet rs = st.executeQuery(query);
			while(rs.next()) {
				return true;
			}
			return false;
	}
	
	public static boolean deleteKey(String key) {
		try {
			Connection conn = Acces.getMySQLConnection();		
			Statement st = conn.createStatement();
			String query="DELETE FROM CONNECTIONS WHERE cle='"+key+"'";
			//UserBD.execute(query);
			st.execute(query);
			st.close();
			conn.close();
			return true;
		}
		catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public static void resetPwd(String email, String psd) throws SQLException {
			Connection conn = Acces.getMySQLConnection();		
			Statement st = conn.createStatement();
			String query="UPDATE USERS SET psd='"+psd+"' WHERE email='"+email+"' ";
			//UserBD.execute(query);
			st.execute(query);
			st.close();
			conn.close();
	}
	
	public static JSONObject chercherUser(String idUser) {
		JSONObject res = new JSONObject();
		try {
			Connection conn = Acces.getMySQLConnection();		
			Statement st = conn.createStatement();
			String query="SELECT email, username FROM USERS WHERE idUser = '"+idUser+"';";
			ResultSet rs;
			
				rs = st.executeQuery(query);
			
			String email="";
			String userName="";
			while(rs.next()) {
				email = rs.getString("email");
				userName = rs.getString("username");
			}
			res.put("code", 0);
			res.put("email", email);
			res.put("username", userName);
			return res;
			
		} catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}catch (SQLException e1) {
			e1.printStackTrace();
			return ServiceTools.serviceRefused("Database connexion error", -200);
		}
		
	}
	
	public static JSONObject chercherUsername(String username) throws SQLException, JSONException {
		JSONObject res = new JSONObject();
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		String query="SELECT idUser, email, username FROM USERS WHERE username LIKE '%"+username+"%';";
		ResultSet rs;
		rs = st.executeQuery(query);

		res.put("code", 0);
		while(rs.next()) {
			JSONObject user=new JSONObject();
			user.put("idUser", rs.getString("idUser"));
			user.put("email", rs.getString("email"));
			user.put("username", rs.getString("username"));
			res.accumulate("users",user);
		}
		return res;
	}
		
	
}