import { Injectable } from "@angular/core";

import 'rxjs/add/operator/share';
@Injectable()
export class LoginService {

	userName: string = "";
	LoggedIn: boolean;
	
	constructor(){

		this.LoggedIn = false;	

	}

	set_login(username) {

		this.userName = username
		this.LoggedIn = true;
	}

	get_logged_in_user(){
		return this.userName;
	}

	isLoggedIn(){
		return this.LoggedIn;

	}

}