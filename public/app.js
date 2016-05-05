//dependecies

var express = require("express");

var app = express();

var server = require("http").createServer(app);

var io  = require("socket.io").listen(server);

//project variables 

var users = [];

var port = 3000;

//code

server.listen(3000);

io.sockets.on("connection" , function(socket){
	console.log(socket);
});










