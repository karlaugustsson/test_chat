import {Component , OnInit} from "@angular/core";
import {OnlineUsersComponent} from "./online-users.component";
import { ChatService } from "../services/chat.service";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { LoginService} from "../services/login.service";

@Component({
	selector: "chat",
	templateUrl:"app/html/chat.component.html",
	directives: [OnlineUsersComponent]
})

export class ChatComponent implements OnInit{
	message:string = "";
	chat_box_items: Array<any> = [];
	OnlineUser:string;
	user_exist = true;

	ngOnInit(){
		this.isOnline();
		this.chat_subscribe();
	}

	isOnline(){
		if (this._LoginService.isLoggedIn() == false){
			
			this.router.navigate(['/login']);
		}else{
			this.OnlineUser = this._LoginService.get_logged_in_user();
		}
		
	}
	constructor(private _chatservice:ChatService ,private router:Router,private _LoginService:LoginService){}
	
	chat_subscribe(){
		this._chatservice.get_chat_stream().subscribe((data) => {this.add_to_chat_items(data.userName,data.message);})
	}
	onSubmit(){
	
		this.add_to_chat_items(this.OnlineUser,this.message);
		this.send_message();
		this.message = "";


	}

	add_to_chat_items(user,message){
		this.chat_box_items.push({ username:user , message:message , image:null});
	}
	send_message(){
		this._chatservice.update_chat_box(this.OnlineUser, this.message);
	}
}