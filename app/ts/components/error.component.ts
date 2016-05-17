import { Component, EventEmitter , Input}  from "@angular/core";
import { MainComponent } from  "./main.component";
import { LoginComponent } from "./login.component";
import { ErrorService } from "../services/error.service";
import { Error } from "../classes/error.ts";


@Component({
	selector: "error",
	templateUrl:"app/html/error.component.html",
	
	providers:[ErrorService]
	

		
})

export class ErrorComponent{
	data:Error[] = [];


	new_error(val){
		this._ErrorService.new_error(val);
	}
	constructor(private _ErrorService:ErrorService){
		
		this._ErrorService.get_error_stream().subscribe(data => { this.data = data; })
	

	}


}