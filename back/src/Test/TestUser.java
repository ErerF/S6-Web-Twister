package Test;

import java.sql.SQLException;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import BD.UserBD;
import Service.User;

public class TestUser {
	public static void main(String[] args) {
		//User.login("tata@163.com","123321");
		//User.createUser("eclipse","eclipse","eclipse@email.com", "eclipse","eclipse");
		//User.logout("9");
		//User.resetPassword("tata@163.com", "12344321");
		//User.nbUser();
		//User.searchUser("2");
		try {
			System.out.println(UserBD.chercherUsername("to"));
		} catch (SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
