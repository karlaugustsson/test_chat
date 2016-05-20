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
var ChatComponent = (function () {
    function ChatComponent(_chatservice, router) {
        this._chatservice = _chatservice;
        this.router = router;
        this.chat_field_value = "";
        this.chat_box_items = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.isOnline();
    };
    ChatComponent.prototype.isOnline = function () {
        if (!this._chatservice.isOnline()) {
            this.router.navigate(['/login']);
        }
    };
    ChatComponent.prototype.new_chat_message = function (event) {
        event.preventDefault();
        this.add_to_chat_items();
        this.chat_field_value = "";
    };
    ChatComponent.prototype.add_to_chat_items = function () {
        this.chat_box_items.push({ username: "change_me", message: this.chat_field_value, image: null });
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: "chat",
            templateUrl: "app/html/chat.component.html",
            directives: [online_users_component_1.OnlineUsersComponent],
            providers: [chat_service_1.ChatService]
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, router_1.Router])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map