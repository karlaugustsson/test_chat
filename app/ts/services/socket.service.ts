import { Injectable } from "@angular/core";

import { ServerService } from "./server.service";
import { Router } from '@angular/router';
const io = require('socket.io-client')

@Injectable()
export class SocketService{
	_socket;
	host;
	port;
	
	constructor(private _serverService:ServerService , Router:Router){
		this._socket = io(this._serverService.get_host() +
		 ":" + this._serverService.get_port()).connect();
		this._socket.on("disconnect", function() {
			alert("conenction was broken all users have been dropped , once this dialog has been closed you will be promted to login again");
			Router.navigate(["/login"]);
		});
	}

	get_socket_connection() {

		return this._socket;
	}
}