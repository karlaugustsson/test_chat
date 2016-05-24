import { Component ,EventEmitter , OnInit} from "@angular/core";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { LoginComponent } from "./login.component";

import { ChatComponent } from "./chat.component";
@Component({
	selector: "my-app",
	templateUrl: "app/html/app.component.html",
	directives: [ROUTER_DIRECTIVES,HeaderComponent,FooterComponent],

})

@Routes([
		{ path: '/login', component: LoginComponent},
		{ path: '/chattie', component: ChatComponent}
])


export class AppComponent  implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}