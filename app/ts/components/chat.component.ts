import {Component , OnInit} from "@angular/core";
import {OnlineUsersComponent} from "./online-users.component";
import { ChatService } from "../services/chat.service";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { LoginService} from "../services/login.service";

@Component({
	selector: "chat",
	templateUrl:"app/html/chat.component.html",
	directives: [OnlineUsersComponent],
	providers: [ChatService]
})

export class ChatComponent implements OnInit{
	chat_field_value:string = "";
	chat_box_items: Array<any> = [];
	OnlineUser:string;

	ngOnInit(){
		this.isOnline();
	}
	isOnline(){
		if (this._LoginService.isLoggedIn() == false){
			
			this.router.navigate(['/login']);
		}else{
			this.OnlineUser = this._LoginService.get_logged_in_user();
		}
		
	}
	constructor(private _chatservice:ChatService ,private router:Router,private _LoginService:LoginService){}
	
	new_chat_message(event){
		event.preventDefault();
		this.add_to_chat_items();
		this.chat_field_value = "";

	}

	add_to_chat_items(){
		this.chat_box_items.push({ username: this.OnlineUser, message:this.chat_field_value , image:null});
		this._chatservice.update_chat_box(this.OnlineUser, this.chat_field_value);
	}
}