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
var online_users_component_1 = require("./online-users.component");
var chat_service_1 = require("../services/chat.service");
var router_1 = require('@angular/router');
var login_service_1 = require("../services/login.service");
var ChatComponent = (function () {
    function ChatComponent(_chatservice, router, _LoginService) {
        this._chatservice = _chatservice;
        this.router = router;
        this._LoginService = _LoginService;
        this.message = "";
        this.chat_box_items = [];
        this.user_exist = true;
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.isOnline();
        this.chat_subscribe();
    };
    ChatComponent.prototype.isOnline = function () {
        if (this._LoginService.isLoggedIn() == false) {
            this.router.navigate(['/login']);
        }
        else {
            this.OnlineUser = this._LoginService.get_logged_in_user();
        }
    };
    ChatComponent.prototype.chat_subscribe = function () {
        var _this = this;
        this._chatservice.get_chat_stream().subscribe(function (data) { _this.add_to_chat_items(data.userName, data.message); });
    };
    ChatComponent.prototype.onSubmit = function () {
        this.add_to_chat_items(this.OnlineUser, this.message);
        this.send_message();
        this.message = "";
    };
    ChatComponent.prototype.add_to_chat_items = function (user, message) {
        this.chat_box_items.push({ username: user, message: message, image: null });
    };
    ChatComponent.prototype.send_message = function () {
        this._chatservice.update_chat_box(this.OnlineUser, this.message);
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: "chat",
            templateUrl: "app/html/chat.component.html",
            directives: [online_users_component_1.OnlineUsersComponent]
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, router_1.Router, login_service_1.LoginService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map