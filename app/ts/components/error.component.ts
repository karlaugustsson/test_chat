import { Component, EventEmitter , Input }  from "@angular/core";
@Component({
	selector:"error",
	templateUrl:"app/html/error.component.html"
})
export class ErrorComponent{
	error:boolean = false;
	error_message: string;
	change = new EventEmitter<any>();
	

	set_error_message(message){
		this.message = message;
	}

	has_error(){
		if (this.error == false){
			return "none";
		}else{
			return "block";
		}
	}


}