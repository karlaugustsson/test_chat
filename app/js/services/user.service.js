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
var Observable_1 = require('rxjs/Observable');
var socket_service_1 = require("../services/socket.service");
var login_service_1 = require("../services/login.service");
var UserService = (function () {
    function UserService(_socketService, _LoginService) {
        var _this = this;
        this._socketService = _socketService;
        this._LoginService = _LoginService;
        this.users = [];
        this.observable$ = new Observable_1.Observable(function (observer) { return _this._UserObserver = observer; });
        this.observable$.subscribe(function (users) {
            _this.users = users;
        });
        this._socket = this._socketService.get_socket_connection();
        this._socket.emit("request_users", function (users) {
            _this._UserObserver.next(users);
        });
        this._socket.on("get_users", function (users) {
            console.log("new users");
            _this._UserObserver.next(users);
        });
        this._socket.on("disconnect", function () {
            alert("conenction over");
        });
    }
    UserService.prototype.get_all_users = function () {
        this._UserObserver.next(this.users);
    };
    UserService.prototype.get_users_per_subscription = function () {
        return this.observable$;
    };
    UserService.prototype.add_new_user = function (username) {
        this._socket.emit("create_new_user", username);
    };
    UserService.prototype.process_users = function (users) {
        console.log("process");
        var online_user = this._LoginService.get_logged_in_user();
        this.users = users.map(function (user) {
            if (online_user && user.UserName == online_user) {
                user.online = true;
            }
            return user;
        });
        return this.users;
    };
    UserService.prototype.user_exists = function (username) {
        var found = this.users.filter(function (user) {
            if (username.match(new RegExp("^" + user.UserName + "$", "i")) != null) {
                return true;
            }
            return false;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, login_service_1.LoginService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map