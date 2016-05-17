import {Component , Input , Output , EventEmitter } from "@angular/core";
import { ErrorService } from "../services/error.service";

@Component({
	selector:"login",
	templateUrl: "app/html/login.component.html",

})

export class LoginComponent{ 



	clicked(value) {
		if (value == "error") {

			//this._ErrorService.new_error(value + " has already been taken");

		}



	}


}