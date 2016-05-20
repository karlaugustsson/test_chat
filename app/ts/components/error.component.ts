import { Component, EventEmitter , Input}  from "@angular/core";
import { MainComponent } from  "./main.component";
import { LoginComponent } from "./login.component";
import { ErrorService } from "../services/error.service";
import { Error } from "../classes/error.ts";
import {Observable} from 'rxjs/Observable';

@Component({
	selector: "error",
	templateUrl:"app/html/error.component.html",	
})

export class ErrorComponent{
	errors = [];

	new_error(val){
		this._ErrorService.new_error(val);
	}

	constructor(private _ErrorService: ErrorService) {

		this._ErrorService.get_error_stream().subscribe(data => {
			
			if(data == null){
				this.errors = [];
			}else{
				this.errors.push({ message: data });
			}

		}
		);


	}


}