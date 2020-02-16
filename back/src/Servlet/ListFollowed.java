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
 * Servlet implementation class ListFriends
 */
@WebServlet("/ListFriends")
public class ListFollowed extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String key=request.getParameter("key");
		String id_follower=request.getParameter("id_follower");
		String id_followed=request.getParameter("id_followed");
		
		JSONObject res = Service.Follow.listFollowed(key,id_follower,id_followed);
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.println(res.toString());
	}

}
