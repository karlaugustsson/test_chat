"use strict";
var socket_1 = require("../mocks/socket");
var SocketService = (function () {
    function SocketService() {
    }
    SocketService.prototype.get_socket_connection = function () {
        return Promise.resolve(socket_1.SOCKET);
    };
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map