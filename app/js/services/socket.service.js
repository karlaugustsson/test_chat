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
var server_service_1 = require("./server.service");
var router_1 = require('@angular/router');
var io = require('socket.io-client');
var SocketService = (function () {
    function SocketService(_serverService, Router) {
        this._serverService = _serverService;
        this._socket = io(this._serverService.get_host() +
            ":" + this._serverService.get_port()).connect();
        this._socket.on("disconnect", function () {
            alert("conenction was broken all users have been dropped , once this dialog has been closed you will be promted to login again");
            Router.navigate(["/login"]);
        });
    }
    SocketService.prototype.get_socket_connection = function () {
        return this._socket;
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, router_1.Router])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map