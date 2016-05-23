import {Injectable} from "@angular/core";

@Injectable()

export class ServerService{
	host: string = "http://localhost";
	port: number = 4000;

	get_host(){
		return this.host;
	}
	get_port(){
		return this.port;
	}
}