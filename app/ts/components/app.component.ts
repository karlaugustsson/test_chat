import { Component ,EventEmitter , OnInit} from "@angular/core";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HeaderComponent } from "./header.component";
import { MainComponent } from "./main.component";
import { FooterComponent } from "./footer.component";
import { LoginComponent } from "./login.component";
import { ChatComponent } from "./chat.component";

@Component({
	selector: "my-app",
	template: "<header></header><main></main><footer></footer>",
	directives: [ROUTER_DIRECTIVES,HeaderComponent,MainComponent,FooterComponent],
})

@Routes([
		{ path: '/login', component: LoginComponent},
		{ path: '/chattie', component: ChatComponent}
])


export class AppComponent { }