import {Component , OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
	selector:"online-users",
	templateUrl:"app/html/online-users.component.html",
})

export class OnlineUsersComponent implements OnInit{
	users: any;
	current_logged_in_user:string;

	
	ngOnInit(){
		
		this.subscribe_for_users();
		this.get_all_users();
	}

	constructor( private _UserService:UserService){
		

	}


	get_all_users(){
		this._UserService.request_all_users();
	}
	subscribe_for_users() {
		this._UserService.get_users_per_subscription().subscribe((users) => {this.users = this._UserService.process_users(users)});
	}
}