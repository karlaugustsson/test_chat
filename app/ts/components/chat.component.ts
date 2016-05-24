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
	error_message:string="";
	whisper:boolean = false;
	image;

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
		this._chatservice.get_chat_stream().subscribe((data) => {this.process_chat_data(data)})
	}
	onSubmit(){
		this.whisper = (this.message.substring(0,3) == "/w ")?true:false;
		
		this.add_to_chat_items((this.whisper == true)?"You ":this.OnlineUser,(this.whisper == true)?this.message.substring(3,this.message.length):this.message,this.image || null , this.whisper );
		this.send_message();
		this.message = "";


	}
	process_chat_data(data){
		console.log(data);
		if(typeof data == "string"){
			this.error_message = data;
		}else{
			this.error_message = "";
			this.add_to_chat_items(data.userName,data.message,data.image||null,data.whisper|| null)
		}
	}
	add_to_chat_items(user,message,image ,whisper ){
		this.chat_box_items.push({ username:user , message:message , image:image||null,whisper:whisper||null});
	}
	send_message(){
		this._chatservice.update_chat_box(this.OnlineUser, this.message);
	}
}