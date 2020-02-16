package Servlet;

import java.io.IOException;
import java.io.PrintWriter;

import Service.User;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * Servlet implementation class CreateUser
 */
@WebServlet("/CreateUser")
public class CreateUser extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		//recupere les valeurs a partir URL
		//tester param non null
		//passer au service:appeler Service/User.createUser()
		//	JSONObject res=ServiceAccount.createUser(xxxxxxxxxxxxxxxx)
		
		/*
		 * class ServiceAccount
		 * 		public static JSONObject createUser
		 * 			tester si user exist:appeler fonction boolean userExist()
		 * 				return JSONObject:error
		 * 			si mdp pas respect format
		 * 			...
		 * 			create user
		 * 				soit ok
		 * 				soit error		 * 
		 * */
		
		//error ou client
		
		String nom=request.getParameter("nom");
		String prenom=request.getParameter("prenom");
		String email=request.getParameter("email");
		String username=request.getParameter("username");
		String mdp=request.getParameter("password");
		
		JSONObject res = Service.User.createUser(nom, prenom, email,username, mdp);
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.println(res.toString());
		
		
		//?????????????dans service/user??
		//if((nom==null)||(prenom==null)||(email==null)||(mdp==null))
		//	throw new IllegalArgumentException();
		
		//User.createUser(nom, prenom, email, mdp);
		
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}
}
