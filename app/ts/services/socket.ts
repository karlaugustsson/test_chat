import {Injectable} from "@angular/core";
import {ServerService} from "./server.service";
import * as io from "socket.io-client";
@Injectable()

export class SocketService{

  constructor(private _server:ServerService){}
  socket = io(this._server.get_host()).connect();
}