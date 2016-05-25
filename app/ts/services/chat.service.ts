import {Injectable} from "@angular/core";
import {LoginService} from "../services/login.service";
import {SocketService} from "../services/socket.service";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
@Injectable()

export class ChatService {
	_socket;
	_chatObservable$;
	message_data;
	result;
	
	constructor(private _loginService:LoginService , private _socketService:SocketService){
	
		
		this._chatObservable$ = new Observable(observer => this.message_data = observer);
		this._chatObservable$.subscribe();


		this._socket = this._socketService.get_socket_connection();
		
		this._socket.on("update_chat_box",(data) => {
			this.message_data.next(data);
		});
	}

	update_chat_box(message,image = null){
		console.log(image);
		let data = (image == null) ? { message: message } : { message: message, file: image , fileType:image.type };
		this._socket.emit("send_message", data,(data) => {
			this.message_data.next(data)
		});

	}
	get_chat_stream(){
		return this._chatObservable$;

	}

}