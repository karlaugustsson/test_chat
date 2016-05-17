"use strict";
var _this = this;
exports.ErrorStream = Observable.create(function (observer) {
    console.log(_this._observer);
    _this._observer = observer;
    _this._observer.next(ERROR);
}).share();
//# sourceMappingURL=errro-stream.js.map