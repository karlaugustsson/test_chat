import { Component, EventEmitter , Input}  from "@angular/core";
import { MainComponent } from  "./main.component";
import { LoginComponent } from "./login.component";
import { ErrorService } from "../services/error.service";
import { Error } from "../classes/error.ts";
import {Observable} from 'rxjs/Observable';

@Component({
	selector: "error",
	templateUrl:"app/html/error.component.html",
	
	providers:[ErrorService]
	

		
})

export class ErrorComponent{
	errors= [];

	new_error(val){
		this._ErrorService.new_error(val);
	}

	constructor(private _ErrorService: ErrorService) {

		this._ErrorService.ErrorSubject$.subscribe(data => {
			
			// this.errors.map((err)=>{
			// 	if(err.message == data){
			// 		this.errors.splice(err,1)
			// 	}else{
			// 		return err;
			// 	}
			// })
			this.errors.push({ message: data });
		}
		);


		this._ErrorService.ErrorClearSubject$.subscribe(data => { if (data == true){this.errors = []}});


	}


}