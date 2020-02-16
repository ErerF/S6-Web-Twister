package BD;

import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class AccesMongo {
	
	public static MongoCollection<Document> getCollection(String coll) {
		 MongoClient client=MongoClients.create();
		 MongoDatabase db=client.getDatabase("Projet_FENG_XU");
		return db.getCollection(coll);
	}
}
