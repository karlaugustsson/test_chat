import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorService {
	observable$;
	ErrorObserver;

	constructor(){
		this.observable$ = new Observable(observer => this.ErrorObserver = observer);

	}
	get_error_stream(){
		return this.observable$;
	}
	new_error(val) {
		this.ErrorObserver.next(val);
	}
	clear_errors(){
		this.ErrorObserver.next(null);
	}


}

