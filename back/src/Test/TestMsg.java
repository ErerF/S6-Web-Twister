package Test;

import BD.MessageBD;
import Service.Message;

public class TestMsg {
	public static void main(String[] args) {
		Message.addMsg("5", "hello&coucou");
		//System.out.println(Message.addMsg("5", "coucou,j'ai reussi a ajouter 1 msg!"));
		System.out.println(Message.listMsgs("5","1"));
		System.out.println(Message.deleteMsg("5","5c77d264d83965291d2b4706"));
		System.out.println(Message.listMsgs("5","2"));
	}

}
