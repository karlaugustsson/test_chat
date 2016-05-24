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
var login_service_1 = require("../services/login.service");
var socket_service_1 = require("../services/socket.service");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var ChatService = (function () {
    function ChatService(_loginService, _socketService) {
        var _this = this;
        this._loginService = _loginService;
        this._socketService = _socketService;
        this.data = [];
        this._chatObservable$ = new Observable_1.Observable(function (observer) { return _this.message_data = observer; });
        this._chatObservable$.subscribe(function (data) { console.log("got that subsshit"); _this.data.push(data); });
        this._socket = this._socketService.get_socket_connection();
        this._socket.on("update_chat_box", function (data) {
            _this.message_data.next(data);
        });
    }
    ChatService.prototype.update_chat_box = function (user, message) {
        var _this = this;
        var data = { message: message };
        this._socket.emit("send_message", data, function (data) {
            _this.message_data.next(data);
        });
    };
    ChatService.prototype.get_chat_stream = function () {
        return this._chatObservable$;
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [login_service_1.LoginService, socket_service_1.SocketService])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map