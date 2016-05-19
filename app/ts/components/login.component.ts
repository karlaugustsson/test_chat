import {Component , Input , Output , EventEmitter , OnInit} from "@angular/core";
import { ErrorService } from "../services/error.service";
import { UserService} from "../services/user.service";
import {User} from "../classes/user";
import { Routes, ROUTER_DIRECTIVES,Router } from '@angular/router';
@Component({
	selector: "login",
	templateUrl: "app/html/login.component.html",
	providers: [UserService],

})

export class LoginComponent implements OnInit {
	username:string="";
	users:User[];

	constructor(private _ErrorService: ErrorService, private _UserService: UserService, private router: Router ) {


	}
	ngOnInit() {
		this.get_all_users();
	}

	get_all_users() {
		this._UserService.get_all_users().then(user => this.users = user );
	}

	attemptLogin(event) {
		event.preventDefault();

		if(this.user_exists()){
			return this.new_error("a user already has that name choose another name")
		}else{

			if(!this.username_ok()){
				return this.new_error("Please no spaces and shit and also username must be more than 3 charcaters long")
			}
			this._ErrorService.clear_errors();
			this._UserService.add_new_user(this.username);
			this.username = "";
			this.router.navigate(['/chattie']);
		}



	}

	new_error(message: string) {
		this._ErrorService.clear_errors();
		this._ErrorService.new_error(message);
	}

	user_exists(){

		let found = this.users.filter((user) => {

			if (this.username.match(new RegExp("^"+user.UserName+"$","i")) != null){
				return true;
		}
			return false;

		});
	
		if (found.length > 0) {
			return true;
		}
		return false;
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