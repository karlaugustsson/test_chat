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
var error_service_1 = require("../services/error.service");
var user_service_1 = require("../services/user.service");
var LoginComponent = (function () {
    function LoginComponent(_ErrorService, _UserService) {
        this._ErrorService = _ErrorService;
        this._UserService = _UserService;
        this.username = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.get_all_users();
    };
    LoginComponent.prototype.get_all_users = function () {
        var _this = this;
        this._UserService.get_all_users().then(function (user) { return _this.users = user; });
    };
    LoginComponent.prototype.attemptLogin = function (event) {
        event.preventDefault();
        if (this.user_exists()) {
            return this.new_error("a user already has that name choose another name");
        }
        else {
            if (!this.username_ok()) {
                return this.new_error("Please no spaces and shit and also username must be more than 3 charcaters long");
            }
            this._ErrorService.clear_errors();
            this._UserService.add_new_user(this.username);
            this.username = "";
        }
    };
    LoginComponent.prototype.new_error = function (message) {
        this._ErrorService.clear_errors();
        this._ErrorService.new_error(message);
    };
    LoginComponent.prototype.user_exists = function () {
        var _this = this;
        var found = this.users.find(function (user) {
            var regEx = new RegExp(_this.username, "gi");
            return user.UserName.match(regEx);
        });
        if (found != undefined) {
            return true;
        }
        return false;
    };
    LoginComponent.prototype.username_ok = function () {
        if (this.username.length < 3) {
            return false;
        }
        if (this.username.match(/[\s]/) != null) {
            return false;
        }
        return true;
    };
    LoginComponent.prototype.register_username = function (username) {
        this.username = username;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "login",
            templateUrl: "app/html/login.component.html",
            providers: [user_service_1.UserService],
        }), 
        __metadata('design:paramtypes', [error_service_1.ErrorService, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map