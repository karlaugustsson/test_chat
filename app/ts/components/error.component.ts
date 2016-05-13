import { Component, EventEmitter , Input }  from "@angular/core";
@Component({
	selector:"error",
	templateUrl:"app/html/error.component.html"
})
export class ErrorComponent{

	error: boolean = false;
	error_message: string;

	toggle_error(arg){

		if( arg == true )
			return this.error = true;
	
		return this.error = false;
	}

	display_errors(arg){
		
		this.error_message = arg;
	}

}