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
		this.get_all_users();
	}

	constructor( private _UserService:UserService){
		

	}



	get_all_users() {

		this._UserService.get_all_users().subscribe((users) => {this.users = users;console.log(this.users)});
	}
}