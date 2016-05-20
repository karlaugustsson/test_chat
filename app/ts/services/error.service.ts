import {Component , Output , EventEmitter , Injectable , OnInit} from "@angular/core";
import {Subject} from 'rxjs/Subject'; 
import {ERROR} from "../mocks/error.mock";
import {CLEAR_ERROR} from "../mocks/clear-error.mock";
@Injectable()
export class ErrorService {
	ErrorSubjectSource$ = ERROR;
	ErrorClearSource$ = CLEAR_ERROR;

	ErrorSubject$ = this.ErrorSubjectSource$.asObservable();
	ErrorClearSubject$ = this.ErrorClearSource$.asObservable();
	
	new_error(val) {
		this.ErrorSubjectSource$.next(val);
	}
	clear_errors(){
		this.ErrorClearSource$.next(true);
	}
}

