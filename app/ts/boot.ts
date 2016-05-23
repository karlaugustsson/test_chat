import { bootstrap }    from '@angular/platform-browser-dynamic';
import { LoginService } from "./services/login.service";
import { AppComponent } from './components/app.component';
import { ROUTER_PROVIDERS } from '@angular/router';
import { ErrorService } from "./services/error.service";
import { ServerService } from "./services/server.service";
import { SocketService } from "./services/socket.service";

bootstrap(AppComponent,[ROUTER_PROVIDERS ,ErrorService , ServerService , SocketService , LoginService]);			