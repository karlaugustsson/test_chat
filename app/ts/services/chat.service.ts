import {Injectable} from "@angular/core";
import {LoginService} from "../services/login.service";
@Injectable()

export class ChatService {
	constructor(private _loginService:LoginService){
	}
	isOnline(){
		console.log(this._loginService.isLoggedIn());
		if (this._loginService.isLoggedIn()){
			return true
		}
		return false;
	}
}