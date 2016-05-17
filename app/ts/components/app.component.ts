import { Component ,EventEmitter} from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MainComponent } from "./main.component";
import { FooterComponent } from "./footer.component";

@Component({
	selector:"my-app",
	template: "<header></header><main></main><footer></footer>",
	directives: [HeaderComponent,MainComponent,FooterComponent],
})

export class AppComponent{
}