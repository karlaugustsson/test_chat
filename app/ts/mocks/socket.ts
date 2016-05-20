const io = require('socket.io-client')
export var SOCKET = io("http://localhost:4000").connect();