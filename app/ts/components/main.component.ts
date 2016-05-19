import {Component , EventEmitter ,Input} from "@angular/core";
import {ErrorComponent} from "./error.component";
import { LoginComponent } from "./login.component";
import { ErrorService } from "../services/error.service";
import {AppComponent} from "./app.component";
import { Routes, ROUTER_DIRECTIVES,Router } from '@angular/router';
@Component({

	selector: "main",
	templateUrl: "app/html/main.component.html",
	directives: [ErrorComponent, ROUTER_DIRECTIVES],
	providers: [ErrorService],
})
export class MainComponent {

	constructor(private router: Router) { }
	ngOnInit() {
		this.router.navigate(['/login']);
	}
}