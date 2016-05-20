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
var ErrorComponent = (function () {
    function ErrorComponent(_ErrorService) {
        var _this = this;
        this._ErrorService = _ErrorService;
        this.errors = [];
        this._ErrorService.get_error_stream().subscribe(function (data) {
            if (data == null) {
                _this.errors = [];
            }
            else {
                _this.errors.push({ message: data });
            }
        });
    }
    ErrorComponent.prototype.new_error = function (val) {
        this._ErrorService.new_error(val);
    };
    ErrorComponent = __decorate([
        core_1.Component({
            selector: "error",
            templateUrl: "app/html/error.component.html",
        }), 
        __metadata('design:paramtypes', [error_service_1.ErrorService])
    ], ErrorComponent);
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=error.component.js.map