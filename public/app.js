//dependecies

var express = require("express");

var app = express();

var server = require("http").createServer(app);

var fs = require('fs');

var io  = require("socket.io").listen(server);

//project variables 

var users = [];

var port = 3000;


app.use('/scripts', express.static(__dirname + '/javascripts/'));
//code

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html")
});

server.listen(3000);

io.sockets.on("connect" , function(socket){


	
	socket.on("disconnect",function(){
		users.splice(users.indexOf(socket.userName));
		console.log(socket.userName + " left the chat");
		io.sockets.emit("update_user_list",users);

	});
});






