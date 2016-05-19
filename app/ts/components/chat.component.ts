import {Component} from "@angular/core";
import {OnlineUsersComponent} from "./online-users.component"
@Component({
	selector:"chat",
	templateUrl:"app/html/chat.component.html",
	directives:[OnlineUsersComponent]
})

export class ChatComponent{
	chat_field_value:string = "";
	chat_box_items: Array<any> = [];
	new_chat_message(event){
		event.preventDefault();
		this.add_to_chat_items();
		this.chat_field_value = "";

	}

	add_to_chat_items(){
		this.chat_box_items.push({ username: "change_me", message:this.chat_field_value , image:null});
	}
}