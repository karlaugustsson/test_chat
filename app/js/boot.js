"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var login_service_1 = require("./services/login.service");
var app_component_1 = require('./components/app.component');
var router_1 = require('@angular/router');
var server_service_1 = require("./services/server.service");
var socket_service_1 = require("./services/socket.service");
var user_service_1 = require("./services/user.service");
var chat_service_1 = require("./services/chat.service");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, server_service_1.ServerService, socket_service_1.SocketService, login_service_1.LoginService, user_service_1.UserService, chat_service_1.ChatService]);
//# sourceMappingURL=boot.js.map