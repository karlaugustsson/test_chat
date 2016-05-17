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
var error_mock_1 = require("../mocks/error.mock");
require('rxjs/Rx');
require('rxjs/add/operator/share');
var Observable_1 = require('rxjs/Observable');
var ErrorService = (function () {
    function ErrorService() {
    }
    ErrorService.prototype.new_error = function (val) {
        error_mock_1.ERROR.push(val);
        this._observer.next(error_mock_1.ERROR);
    };
    ErrorService.prototype.get_error_stream = function () {
        var _this = this;
        this._observable = Observable_1.Observable.create(function (observer) { return _this._observer = observer; }).share();
        return this._observable;
    };
    ErrorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ErrorService);
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=error.service.js.map