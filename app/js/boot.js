"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var login_service_1 = require("./services/login.service");
var app_component_1 = require('./components/app.component');
var router_1 = require('@angular/router');
var error_service_1 = require("./services/error.service");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, login_service_1.LoginService, error_service_1.ErrorService]);
//# sourceMappingURL=boot.js.map