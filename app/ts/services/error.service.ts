import {Component , Output , EventEmitter , Injectable} from "@angular/core";


import {Error} from "../classes/error";
import {ERROR} from "../mocks/error.mock"
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class ErrorService{
	_observable;
	_observer;
	constructor(){
		


	}

	new_error(val) {
	
		ERROR.push(val);
		this._observer.next(ERROR)
	}
	get_error_stream(){
		this._observable = Observable.create(observer => this._observer = observer).share();
		return this._observable;
	}


}

