import { bootstrap }    from '@angular/platform-browser-dynamic';
import { LoginService } from "./services/login.service";
import { AppComponent } from './components/app.component';
import { ROUTER_PROVIDERS } from '@angular/router';

import { ServerService } from "./services/server.service";
import { SocketService } from "./services/socket.service";
import { UserService } from "./services/user.service";
import { ChatService } from "./services/chat.service";
bootstrap(AppComponent,[ROUTER_PROVIDERS , ServerService , SocketService , LoginService , UserService,ChatService]);			