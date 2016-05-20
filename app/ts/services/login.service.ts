import {Injectable} from "@angular/core";

@Injectable()

export class LoginService {

	LoggedIn: boolean;
	constructor(){
		this.LoggedIn = false;
	}

	set_login() {
		this.LoggedIn = true;
	}

	isLoggedIn(){
		return this.LoggedIn;
	}

}