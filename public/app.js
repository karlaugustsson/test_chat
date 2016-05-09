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

		io.sockets.emit("update_users_online_list",users);

	});
	socket.on("user_exist",function(data,callback){
	if(users.length != 0){

		if(users.find(function(user){
	
			return user.userName.match(/data.userName/gi)}) == null ){
			

		callback(false);

		create_new_user(socket , data.userName );

		}else{
			callback(true)
		}

	}else{
		create_new_user(socket , data.userName );
		callback(false);
	}

	})

	socket.on("send_message",function(data){

		if(data.file){
			var image = new Buffer(data.file.data , "binary").toString("base64");
			data.file.data = image ;
		}
		data.userName = socket.userName;
		

	
		
		io.sockets.emit("update_chat_box",data);
	});

});

function create_new_user(socket ,userName){
	socket.userName = userName;
	users.push({userName:userName});
	io.sockets.emit("update_users_online_list",users);
}






