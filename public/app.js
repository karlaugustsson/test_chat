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

	console.log("new user joined the chat")

	socket.on("new_message",function(data,callback){
		var message = data.message.trim(data.message);

		if(message.substring(0,3) == "/w "){
			message = message.substring(3,message.length);
			console.log(message);
			name_end = message.indexOf(" ");
			if(name_end != undefined){
				console.log(name_end + "japps")
				name = find_user(message.substring(0,name_end));
				console.log(name);
				
				if(name == false){
					callback("that user was not found try again");
				}else{
					message = message.substring(name_end + 1,message.length);
					console.log(message)
					message = message.substring(0, name_end +1);
				}


			}
		}else{
		data = [{userName:socket.userName , message:message}];
		io.sockets.emit("update_them_chats",data);			
		}

	});
	socket.on("find_user",function(data,callback){

		if(typeof socket.userName === "undefined"){
		
		var user  = find_user(data.userName);
		
		if(user.length == 0){

			users.push({userName:data.userName , 'socket':socket.id});
			socket.userName = data.userName;

			socket.emit("start_chat",users);
			
			io.sockets.emit("update_user_list" , users);

		}else{
			callback("user already exists");				
		}

		}
		

		
});
	
	socket.on("disconnect",function(){
		users.splice(users.indexOf(socket.userName));
		console.log(socket.userName + " left the chat");
		io.sockets.emit("update_user_list",users);

	});
});


function find_user(userName){
	var result = users.filter(function(obj){
			
			return obj.userName === userName;
	});

	return result;
}






