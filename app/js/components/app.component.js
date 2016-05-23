"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var header_component_1 = require("./header.component");
var main_component_1 = require("./main.component");
var footer_component_1 = require("./footer.component");
var login_component_1 = require("./login.component");
var chat_component_1 = require("./chat.component");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "<header></header><main></main><footer></footer>",
            directives: [router_1.ROUTER_DIRECTIVES, header_component_1.HeaderComponent, main_component_1.MainComponent, footer_component_1.FooterComponent],
        }),
        router_1.Routes([
            { path: '/login', component: login_component_1.LoginComponent },
            { path: '/chattie', component: chat_component_1.ChatComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map