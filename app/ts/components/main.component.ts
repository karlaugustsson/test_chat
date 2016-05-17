import {Component , EventEmitter ,Input ,OnInit} from "@angular/core";
import {ErrorComponent} from "./error.component";
import { LoginComponent } from "./login.component";
import { ErrorService } from "../services/error.service";


@Component({

	selector: "main",
	templateUrl:"app/html/main.component.html",
	directives: [ErrorComponent,LoginComponent],
	providers:[ErrorService],


	
})

export class MainComponent{


constructor(){}


}
