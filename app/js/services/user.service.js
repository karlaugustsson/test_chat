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
var UserService = (function () {
    function UserService(_socketService) {
        var _this = this;
        this._socketService = _socketService;
        this.users = [];
        this.observable$ = new Observable_1.Observable(function (observer) { return _this._UserObserver = observer; });
        this.observable$.subscribe(function (data) {
            console.log(data);
            _this.users = data;
        });
        this._socketService.get_socket_connection().then(function (socket) {
            _this._socket = socket;
            _this._socket.emit("request_users", function (data) {
                _this._UserObserver.next(data);
            });
            _this._socket.on("get_users", function (data) {
                _this._UserObserver.next(data);
            });
        });
    }
    UserService.prototype.get_all_users = function () {
        return this.observable$;
    };
    UserService.prototype.add_new_user = function (username) {
        this._socket.emit("create_new_user", username);
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
        __metadata('design:paramtypes', [socket_service_1.SocketService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map