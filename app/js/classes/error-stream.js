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
var ErrorStream = (function () {
    function ErrorStream() {
        var _this = this;
        this._observable = Observable_1.Observable.create(function (observer) { return _this._observer = observer; });
    }
    ErrorStream.prototype.get_observable = function () {
        return this._observable;
    };
    ErrorStream = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ErrorStream);
    return ErrorStream;
}());
exports.ErrorStream = ErrorStream;
//# sourceMappingURL=error-stream.js.map