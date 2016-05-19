import {Component , OnInit } from "@angular/core";
import {UserService} from "../services/user.service";
@Component({
	selector:"online-users",
	templateUrl:"app/html/online-users.component.html",
	providers:[UserService]
})

export class OnlineUsersComponent implements OnInit{
	users: any;
	ngOnInit(){
		this.get_all_users();
	}
	constructor( private _UserService:UserService ){

	}
	get_all_users(){
		this._UserService.get_all_users().then(users => this.users = users);
	}
}