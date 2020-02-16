package Service;

import org.json.JSONException;
import org.json.JSONObject;

public class ServiceTools {
	
	public static JSONObject serviceRefused(String message, int code) {
		JSONObject res = new JSONObject();
		try {
			res.put("message", message);
			res.put("code", code);
		} catch (JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		return res;
	}
	
	
	
}
