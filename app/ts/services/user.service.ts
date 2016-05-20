import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { User } from "../classes/user";
import { SocketService } from "../services/socket.service";
@Injectable()

export class UserService {
	_socket;
	users: User[] = [];
	_UserObserver;
	observable$;
	


	constructor(private _socketService: SocketService){

	this.observable$ = new Observable(observer => this._UserObserver = observer);
		this.observable$.subscribe((data) => {
			console.log(data);
			this.users = data;
		});

		this._socketService.get_socket_connection().then((socket) => {

			this._socket = socket;

			this._socket.emit("request_users", (data) => {
				
				this._UserObserver.next(data);
			});

			this._socket.on("get_users", (data) => {
				this._UserObserver.next(data);
			});


		});
	}


	get_all_users() {

		return this.observable$;
		
	}

	add_new_user(username: string) {

		this._socket.emit("create_new_user", username);
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