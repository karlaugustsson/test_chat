//dependecies

var express = require("express");

var app = express();

var server = require("http").createServer(app);

var fs = require('fs');

var io  = require("socket.io").listen(server);

var socket_connections = [];

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
		
		var index = users.indexOf(socket.userName);
		

		if(index == -1){
			return
		}


		users.splice(index,1);

		console.log(socket.userName + " left the chat");
	
		io.sockets.emit("update_users_online_list",users);

	});

	socket.on("user_exist",function(data,callback){
	if(users.length != 0){

		if( users.indexOf(data.userName) === -1 ){
			

		callback(false);

		create_new_user(socket , data.userName );

		}else{
			callback(true)
		}

	}else{
		create_new_user(socket , data.userName );
		callback(false);
	}

	});

	socket.on("send_message",function(data,callback){
		message = data.message.toString().trim();

		if(data.file){

			var hex_accepted = ['ffd8ffe0' , "47494638" , "89504e47"]
			var hex_string = data.file.data.slice(0, 4).toString('hex');
			
			if(hex_accepted.indexOf(hex_string) != -1){
				
				var image = new Buffer(data.file.data, "binary").toString("base64").trim();
		
				data.file.data = image ;	
			}

		}
		
		if ( message.substring(0,3) == "/w " ){

			message = message.substring(3,message.length);
		
			var endOfUsernameIndex = message.indexOf(" ");
		
			if ( endOfUsernameIndex != -1 ){
				searchUsername = message.substring(0,endOfUsernameIndex);
				

				var found_user = users.indexOf(searchUsername);
				

				if ( found_user !== -1 ){
				
				data.message = message.substring(endOfUsernameIndex,message.length);
				data.userName = socket.userName;
				
				
				var soc = socket_connections.find(function(socket){
					if(socket.userName == users[found_user]){
						return socket;
					}
				});

		
	
				if ( soc !== undefined ){
					
					data.whisper = true;
					soc.emit("update_chat_box",data);
				}
				
				}else{
					callback("user was not found :(")
				}
			
		}else{
			callback("input for whisper not valid");
		}

		}else{
		
			data.message = message;
			data.userName = socket.userName;		
			io.sockets.emit("update_chat_box",data);			
		}
	});

});

function create_new_user(socket ,userName){
	socket_connections.push(socket);
	socket.userName = userName;
	users.push(userName);
	io.sockets.emit("update_users_online_list",users);
}






