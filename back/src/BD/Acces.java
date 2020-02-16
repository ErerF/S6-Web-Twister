package BD;

import java.sql.*;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.*;

public class Acces {
	private DataSource dataSource;
	private static Acces database=null;

	public Acces(String jndiname) throws SQLException {
		try {
			dataSource = (DataSource) new InitialContext().lookup("java:comp/env/" + jndiname);
		}catch(NamingException e) {
			// Handle error that it’s not configured in JNDI.
			throw new SQLException(jndiname + " is missing in JNDI! : " + e.getMessage());
		}
	}
	
	public Connection getConnection() throws SQLException{
		return dataSource.getConnection();
	} 
	
	public static Connection getMySQLConnection() throws SQLException{
		if(BDStatic.mysql_pooling == false) {
		Connection conn = null;
		try {
			Class.forName(BDStatic.JDBC_DRIVER);
			conn = DriverManager.getConnection(BDStatic.mysql_host, BDStatic.mysql_username, BDStatic.mysql_password);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		
		return conn;
	}
	
		/*if(BDStatic.mysql_pooling == false) {
			return(DriverManager.getConnection(BDStatic.mysql_host,BDStatic.mysql_username, BDStatic.mysql_password));
		}*/
		else {
			if(database == null) {
				database = new Acces("jdbc/db");
			}
			return(database.getConnection());
		}
		
	}
}
