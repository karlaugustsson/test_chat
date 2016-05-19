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
var user_service_1 = require("../services/user.service");
var OnlineUsersComponent = (function () {
    function OnlineUsersComponent(_UserService) {
        this._UserService = _UserService;
    }
    OnlineUsersComponent.prototype.ngOnInit = function () {
        this.get_all_users();
    };
    OnlineUsersComponent.prototype.get_all_users = function () {
        var _this = this;
        this._UserService.get_all_users().then(function (users) { return _this.users = users; });
    };
    OnlineUsersComponent = __decorate([
        core_1.Component({
            selector: "online-users",
            templateUrl: "app/html/online-users.component.html",
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], OnlineUsersComponent);
    return OnlineUsersComponent;
}());
exports.OnlineUsersComponent = OnlineUsersComponent;
//# sourceMappingURL=online-users.component.js.map