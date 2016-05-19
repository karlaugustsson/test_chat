"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var feathers = require('feathers/client');
var socketio = require('feathers-socketio/client');
var io = require('socket.io-client');
var localstorage = require('feathers-localstorage');
var hooks = require('feathers-hooks');
var rest = require('feathers-rest/client');
var authentication = require('feathers-authentication/client');
var core_1 = require('angular2/core');
var superagent = require('superagent');
var HOST = 'http://localhost:3000'; // Your base server URL here
var RestService = (function () {
    function RestService() {
        this._app = feathers() // Initialize feathers
            .configure(rest(HOST).superagent(superagent)) // Fire up rest
            .configure(hooks()); // Configure feathers-hooks
    }
    RestService = __decorate([
        // Your base server URL here
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
var SocketService = (function (_super) {
    __extends(SocketService, _super);
    function SocketService() {
        this.socket = io(HOST);
        this._app = feathers()
            .configure(socketio(this.socket))
            .configure(hooks());
    }
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}(Service));
exports.SocketService = SocketService;
//# sourceMappingURL=feathers.service.js.map