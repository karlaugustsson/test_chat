import {Component} from "@angular/core";
import {ErrorComponent} from "./error.component";
import { LoginComponent } from "./login.component";
@Component({

	selector:"main",
	templateUrl:"app/html/main.component.html",
	directives:[ErrorComponent,LoginComponent],

})

export class MainComponent{}