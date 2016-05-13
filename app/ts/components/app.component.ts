import { Component } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { LoginComponent } from "./login.component";
import {FooterComponent} from "./footer.component";
@Component({
	selector:"my-app",
	template:"<header></header><footer></footer>",
	directives:[HeaderComponent,FooterComponent]
})
export class AppComponent{}