import {Injectable} from "@angular/core";

@Injectable()

export class ServerService{
	host: string = window.location.host;
	port: number = 3000;

	get_host(){
		return this.host;
	}
	get_port(){
		return this.port;
	}
}