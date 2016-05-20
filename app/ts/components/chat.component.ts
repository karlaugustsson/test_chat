import {Component , OnInit} from "@angular/core";
import {OnlineUsersComponent} from "./online-users.component";
import { ChatService } from "../services/chat.service";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
	selector: "chat",
	templateUrl:"app/html/chat.component.html",
	directives: [OnlineUsersComponent],
	providers: [ChatService]
})

export class ChatComponent implements OnInit{
	chat_field_value:string = "";
	chat_box_items: Array<any> = [];
	ngOnInit(){
		this.isOnline();
	}
	isOnline(){
		if (!this._chatservice.isOnline()){
			this.router.navigate(['/login']);
		}
	}
	constructor(private _chatservice:ChatService ,private router:Router){}
	
	new_chat_message(event){
		event.preventDefault();
		this.add_to_chat_items();
		this.chat_field_value = "";

	}

	add_to_chat_items(){
		this.chat_box_items.push({ username: "change_me", message:this.chat_field_value , image:null});
	}
}