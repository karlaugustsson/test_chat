import { Injectable } from "@angular/core";

import { ServerService } from "./server.service";

const io = require('socket.io-client')

@Injectable()
export class SocketService{
	_socket;
	host;
	port;
	
	constructor(private _serverService:ServerService){
		this._socket = io(this._serverService.get_host() +
		 ":" + this._serverService.get_port()).connect();
	}

	get_socket_connection() {

		return this._socket;
	}
}