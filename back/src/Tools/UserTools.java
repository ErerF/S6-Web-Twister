package Tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import BD.Acces;
import BD.UserBD;
import Service.UserUnconnectedException;

public class UserTools {
	public static boolean UserExists(String login)throws SQLException{
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		
		String query = "SELECT * FROM USERS WHERE email = '"+login+"';";
		//ResultSet rs=BD.UserBD.execute(query);
		ResultSet rs = st.executeQuery(query);
		
		boolean userExist = false;
		while(rs.next()) {
			userExist = true;
		}
		st.close();
		conn.close();
		return userExist;
	}
	
	public static boolean checkUserPsd(String email,String psd)throws SQLException{
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		String query = "SELECT psd FROM USERS WHERE email = '"+email+"';";
		//ResultSet rs=BD.UserBD.execute(query);
		ResultSet rs = st.executeQuery(query);

		boolean psdRight = false;
		String password="";
		while(rs.next()) {
			password = rs.getString("psd");
		}
		if(password.equals(psd)) {
			psdRight = true;
		}
		st.close();
		conn.close();
		return psdRight;
	}
	
	public static String getIdUser(String key) throws SQLException,UserUnconnectedException{
		String idUser="";
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		String query = "SELECT idUser FROM CONNECTIONS WHERE cle = '"+key+"';";
		/*ResultSet rs;
		rs = BD.UserBD.execute(query);	*/	
		ResultSet rs = st.executeQuery(query);
		while(rs.next()) {
			idUser = rs.getString("idUser");
		}
		st.close();
		conn.close();
		
		if(idUser.equals(""))
			throw new UserUnconnectedException();
		return idUser;
	}
	
	public static String getUsername(String id) throws SQLException,UserUnconnectedException{
		String username="";
		Connection conn = Acces.getMySQLConnection();		
		Statement st = conn.createStatement();
		String query = "SELECT username FROM USERS WHERE idUser = '"+id+"';";
		/*ResultSet rs;
		rs = BD.UserBD.execute(query);	*/	
		ResultSet rs = st.executeQuery(query);
		while(rs.next()) {
			username = rs.getString("username");
		}
		st.close();
		conn.close();
		
		if(username.equals(""))
			throw new UserUnconnectedException();
		return username;
	}

	public static boolean userConnected(String key) throws UserUnconnectedException{
		try {
			Connection conn = Acces.getMySQLConnection();		
			Statement st = conn.createStatement();
			String query = "SELECT dateFin FROM CONNECTIONS WHERE cle = '"+key+"';";
			//ResultSet rs=BD.UserBD.execute(query);
			
			ResultSet rs = st.executeQuery(query);
			String dateFin="";
			while(rs.next()) {
				dateFin = rs.getString("dateFin");
			}
			st.close();
			conn.close();
			
			if(dateFin.equals(""))
				throw new UserUnconnectedException();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//System.out.println(dateFin.substring(0,19));
			Date dateF=sdf.parse(dateFin.substring(0,19));
			if(!dateF.after(new Date())) {
				UserBD.deleteKey(key);
				throw new UserUnconnectedException();
			}
			
			return true;
		}
		catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		catch (ParseException e) {
			e.printStackTrace();
			return false;
		}
	}
}
