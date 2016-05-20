import {Component , Input , Output , EventEmitter , OnInit} from "@angular/core";
import { ErrorService } from "../services/error.service";
import { UserService} from "../services/user.service";
import {User} from "../classes/user";
import { Routes, ROUTER_DIRECTIVES,Router } from '@angular/router';
import {SocketService } from "../services/socket.service";
import { LoginService } from "../services/login.service";
@Component({
	selector: "login",
	templateUrl: "app/html/login.component.html",
	directives:[ROUTER_DIRECTIVES],
	providers: [UserService , SocketService ],

})

export class LoginComponent{

	username:string="";

	constructor(private _loginService:LoginService, private _ErrorService: ErrorService, private _UserService: UserService, private router: Router ) {
	}

	attemptLogin(event) {

		event.preventDefault();

		if(this._UserService.user_exists(this.username)){
			return this.new_error("a user already has that name choose another name")
		}else{

			if(!this.username_ok()){
				return this.new_error("Please no spaces and shit and also username must be more than 3 charcaters long")
			}
			this._ErrorService.clear_errors();
			this._UserService.add_new_user(this.username);
			this.username = "";
			this._loginService.set_login();
			console.log(this._loginService.isLoggedIn());
			this.router.navigate(['/chattie']);
		}



	}

	new_error(message: string) {
		this._ErrorService.clear_errors();
		this._ErrorService.new_error(message);
	}


	username_ok(){
		if(this.username.length < 3){
			return false;
		}
		if (this.username.match(/[\s]/) != null){
			return false;
		}
		return true;
	}

	register_username(username) {
		this.username = username;


	}

}