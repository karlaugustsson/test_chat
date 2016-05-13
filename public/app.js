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
		

		if( index > -1 ){
			users.splice(index , 1);
		}else{
			return;
		}


		
		console.log(users);
		console.log(socket.userName + " left the chat");
	
		io.sockets.emit("update_users_online_list",users);

	});

	socket.on("user_exist",function(data,callback){
	

	if ( users.indexOf(data.userName) != -1 ){

			callback(true)

	}else{

		create_new_user(socket , data.userName );
		callback(false);
	}

	});

	socket.on("send_message",function(data,callback){
		socket.emit("clear_inputs");
		if(data.message !== false){
			message = data.message.toString().trim();
		}else{
			message = data.message;
		}
		

		if(data.file && validate_image_file(data.file.data) == true ){
		
			data.file.data = new Buffer(data.file.data, "binary").toString("base64").trim() ;	
		}
		
		if ( message != false && message_whisper(message) == true ){

			message = remove_whisper_prefix(message);
		
			var searchUsername = find_whisper_username(message);
			
			if ( typeof searchUsername === 'number' ){
				
				var soc = socket_connections.find(function(socket){
				
				if(socket.userName == users[searchUsername]){
						return socket;
				}

				});
			}
	
			if ( soc !== undefined ){


				data.message = message.substring(users[searchUsername].length,message.length);
				data.userName = socket.userName;
				data.whisper = true;

				soc.emit("update_chat_box",data);
				
				}


			if( searchUsername == null ){

				callback("User was not found :(");
			}

			if(searchUsername === false ){

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

function validate_image_file(image){
	var hex_accepted = ['ffd8ffe0' , "47494638" , "89504e47"]
	var hex_string = image.slice(0, 4).toString('hex');
			
	return (hex_accepted.indexOf(hex_string) != -1);
}

function message_whisper(message){
	return message.substring(0,3) == "/w ";
}
function remove_whisper_prefix(message){
	return message.substring(3,message.length);
}
function find_whisper_username(message){
	
	var endOfUsernameIndex = message.indexOf(" ");
	
	
	if ( endOfUsernameIndex != -1 ){

		var searchUsername = message.substring(0,endOfUsernameIndex);
		

		found_user = users.indexOf(searchUsername);
		
		if ( found_user != -1 ){
				
		return found_user ;
					
		}else{
			return null;
		}
	}
	return false;
		
}






