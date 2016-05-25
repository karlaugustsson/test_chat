import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { User } from "../classes/user";
import { SocketService } from "../services/socket.service";
import { LoginService } from "../services/login.service";
@Injectable()

export class UserService {
	_socket;
	users:User[] = [];
	_UserObserver;
	observable$;
	


	constructor(private _socketService: SocketService ,private _LoginService:LoginService){

		this.observable$ = new Observable(observer => this._UserObserver = observer);
			
		this.observable$.subscribe((users) => {
			this.users = users
		});

		this._socket = this._socketService.get_socket_connection();

		this._socket.emit("request_users", (users) => {
			this._UserObserver.next(users);
		});

		this._socket.on("get_users", (users) => {

			this._UserObserver.next(users);
		});

	}

	get_user_count(){
		return this.users.length;
	}
	request_all_users(){
		this._UserObserver.next(this.users);
	}
	get_users_per_subscription() {

		return this.observable$;
		
	}

	add_new_user(username: string) {

		this._socket.emit("create_new_user", username);
	}

	process_users(users){
		
		let online_user = this._LoginService.get_logged_in_user();

		this.users = users.map((user) => {
		
			if (online_user && user.UserName == online_user){
				user.online = true;
			}
			return user;
		})

		return this.users;

	}

	user_exists(username) {

		let found = this.users.filter((user) => {

			if (username.match(new RegExp("^" + user.UserName + "$", "i")) != null) {
				return true;
			}
			return false;

		});

		if (found.length > 0) {
			return true;
		}
		return false;
	}
}