"use strict";
require('rxjs/Rx');
require('rxjs/add/operator/share');
var crazy_mock_1 = require("./crazy.mock");
var OBSERVABLE = (function () {
    function OBSERVABLE() {
    }
    OBSERVABLE.prototype.get_obs = function () {
        return Promise.resolve(crazy_mock_1.CRAZY);
    };
    return OBSERVABLE;
}());
exports.OBSERVABLE = OBSERVABLE;
//# sourceMappingURL=observable.mock.js.map