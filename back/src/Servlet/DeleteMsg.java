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
 * Servlet implementation class DeleteMsg
 */
@WebServlet("/DeleteMsg")
public class DeleteMsg extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String key=request.getParameter("key");
		String id_msg=request.getParameter("id");
		
		JSONObject res = Service.Message.deleteMsg(key,id_msg);
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.println(res.toString());
	}

}
