package BD;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import Service.ServiceTools;
import Service.UserUnconnectedException;
import Tools.MessageTools;
import Tools.UserTools;

import com.mongodb.client.FindIterable;


public class MessageBD {
	private static String collection="Messages";
	
	public static JSONObject addMsg(String key, String msg) throws SQLException,JSONException,UserUnconnectedException {			
		JSONObject res = new JSONObject();
		
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		Document q=new Document();	
		
		String id=UserTools.getIdUser(key);
		q.append("author_id",id);
		q.append("author_name",UserTools.getUsername(id));
		q.append("text",msg);
		q.append("date",new Date());
		mc.insertOne(q);
		
		res.put("code", 0);
		res.put("data", q.toJson());
		
		return res;//MessageTools.getCertainMsg(id, msg);
	}
	
	public static void deleteMsg(String id_msg){		
		//System.out.println("in MessageBD/delete");
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		mc.deleteOne(new Document("_id",new ObjectId(id_msg)));
		//System.out.println("out MessageBD/delete");
	}
	
	public static JSONObject listMsgs(String key,String id_author) throws SQLException,UserUnconnectedException,JSONException {
		/*MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		Document q=new Document();	
		String id=UserTools.getIdUser(key);
		q.append("author_id",id);
		MongoCursor<Document> cursor=mc.find(q).iterator();
		
		JSONObject json=new JSONObject();
		try {
			while(cursor.hasNext()) {
				Document obj=cursor.next();
				json.append("res",obj);
				System.out.println(obj);
			}
		}
		catch(JSONException e) {
			e.printStackTrace();
			return ServiceTools.serviceRefused("JSON error", -100);
		}
		return json;*/
		JSONObject res=new JSONObject();
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		if(id_author.equals("")) {
			//id_author=UserTools.getIdUser(key);
			
			FindIterable<Document> iterables = mc.find();
			MongoCursor<Document> cursor = iterables.iterator();
			while (cursor.hasNext()) {
				Document obj=cursor.next();
	            res.accumulate("msgs",obj);
	        }
			return res;
		}
		
		Document q=new Document();
		q.append("author_id",id_author);
		MongoCursor<Document> cursor=mc.find(q).iterator();
		
		while(cursor.hasNext()) {
			Document obj=cursor.next();
			res.accumulate("msgs", obj);
		}
		return res;
	}
	
	public static int NbMsgs() {
		List<Document> listMessages = new ArrayList<Document>();
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		FindIterable<Document> iterables = mc.find();
		MongoCursor<Document> cursor = iterables.iterator();
		while (cursor.hasNext()) {
			listMessages.add(cursor.next());
		}
		return listMessages.size();
	}
}
