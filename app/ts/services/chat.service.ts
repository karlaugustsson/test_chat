import {Injectable} from "@angular/core";
import {LoginService} from "../services/login.service";
import {SocketService} from "../services/socket.service";
@Injectable()

export class ChatService {
	_socket;
	constructor(private _loginService:LoginService , private _socketService:SocketService){
		this._socket = this._socketService.get_socket_connection();
	}

	update_chat_box(user,message){
		let data = { message:message}
		this._socket.emit("send_message", data);

	}

}