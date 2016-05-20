import {Component , EventEmitter ,Input , OnInit} from "@angular/core";
import {ErrorComponent} from "./error.component";
import { LoginComponent } from "./login.component";
import { ErrorService } from "../services/error.service";
import {AppComponent} from "./app.component";
import { Routes, ROUTER_DIRECTIVES,Router } from '@angular/router';
import {SocketService } from "../services/socket.service";
@Component({

	selector: "main",
	templateUrl: "app/html/main.component.html",
	directives: [ErrorComponent, ROUTER_DIRECTIVES],
	providers: [ErrorService,SocketService],
})
export class MainComponent implements OnInit {

	constructor(private router: Router) { }
	
	ngOnInit() {
	
	}
}