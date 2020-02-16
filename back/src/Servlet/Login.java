package Servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		String email=request.getParameter("login");
		String mdp=request.getParameter("password");
		
		JSONObject res = Service.User.login(email, mdp);
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.println(res.toString());
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

}