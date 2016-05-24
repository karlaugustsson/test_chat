import {Component , Input , Output , EventEmitter , OnInit} from "@angular/core";
import {User} from "../classes/user";
import { Routes, ROUTER_DIRECTIVES,Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { UserService } from "../services/user.service";

@Component({
	selector: "login",
	templateUrl: "app/html/login.component.html",
	directives:[ROUTER_DIRECTIVES]

})

export class LoginComponent{

	user = new User("");
	submitted = false;
	valid:boolean = false;
	user_exist:boolean = false;

	onSubmit(){
		this.user_exists();
		if(this.valid == true){
			this.submitted = true;
			this._loginService.set_login(this.user.UserName);
			this._UserService.add_new_user(this.user.UserName)
			this._router.navigate(["/chattie"]);	
		}

	}

	user_exists(){

		if (!this._UserService.user_exists(this.user.UserName ) ){
			this.valid = true;
		}else{
			this.user_exist = true;
		}
	}

	constructor(private _loginService:LoginService, private _router: Router , private _UserService:UserService ) {
	}

}