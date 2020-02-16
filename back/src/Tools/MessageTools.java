package Tools;

import java.sql.SQLException;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import BD.AccesMongo;
import Service.UserUnconnectedException;

public class MessageTools {
	private static String collection="Messages";

	/*public static JSONObject getMsgs(String author_id) throws JSONException{
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		Document q=new Document();
		q.append("author_id",author_id);
		MongoCursor<Document> cursor=mc.find(q).iterator();
		JSONObject res=new JSONObject();
		while(cursor.hasNext()) {
			Document obj=cursor.next();
			res.accumulate("msgs", obj);
		}
		return res;
	}*/
	
	/*public static JSONObject getCertainMsg(String author_id,String msg) throws JSONException{
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		Document q=new Document();
		q.append("author_id",author_id);
		q.append("text",msg);
		MongoCursor<Document> cursor=mc.find(q).iterator();
		JSONObject res=new JSONObject();
		while(cursor.hasNext()) {
			Document obj=cursor.next();
			res.accumulate("msgs", obj);
		}
		return res;
	}*/
	
	public static boolean checkAuthor(String key,String id_msg) throws SQLException, UserUnconnectedException {
		//System.out.println("in checkAuthor");

		String id_user=UserTools.getIdUser(key);
		
		MongoCollection<Document> mc=AccesMongo.getCollection(collection);
		Document q=new Document();
		q.append("_id",new ObjectId(id_msg));
		MongoCursor<Document> cursor=mc.find(q).iterator();
		String id_author="";
		while(cursor.hasNext()) {
			//System.out.println("in while");
			Document obj=cursor.next();
			//System.out.println("obj="+obj);
			id_author=obj.getString("author_id");
		}
		
		//System.out.println("id_user="+id_user);
		//System.out.println("id_author="+id_author);
		//boolean ok=id_user.equals(id_author);
		//System.out.println("out checkAuthor:"+ok);
		//return ok;
		return id_user.equals(id_author);
	}
}
