$( document ).ready(function() {
    
    
    var portNumber = 3000;


    var nameField = $("#nameField");
    var username_form = $("#nameForm");


    var socket = io("http://localhost:" + portNumber ).connect();
    
    var error_box = $("#errorBox");	
    

    var loginForm = $("#loginForm");
    var chatApp = $("#chatApp");
    var users_online_box = $("#usersOnlineBox");
    var chat_field = $("#chatField");
    var message_form = $("#chatForm");
    var message_box = $("#chatBox");
    
    message_box.hide();
    message_form.hide();
    users_online_box.hide();
    error_box.hide();


    username_form.on("submit",function(e){

    	var username = nameField.val();

    	e.preventDefault();
    	socket.emit("user_exist",{userName:username},function(answer){
    		
    		if(answer == false){
    			chat_field.val("");
    			start_chat(username);
    		}else{
    			error_box.show();
    			console.log(answer);
    			error_box.html("sorry bro that username is already taken");
    		}
    	})
    });
    message_form.on("submit" , function(e){
    	e.preventDefault();
    	socket.emit("send_message",{message:chat_field.val()});
    	chat_field.val("");
    })
    socket.on("update_users_online_list",function(users){
   
    	users_online_box.html("");
   
    	users.map(function(user){
    		users_online_box.append('<span class="user">' + user.userName + '</span>');
    	});	

    });
    socket.on("update_chat_box",function(data){
 
    		message_box.append( "<p>" + data.userName + ":" + data.message + "</p>");
    });

    function start_chat(){
    username_form.hide();
    error_box.hide();

    message_box.show();
    message_form.show();
    users_online_box.show();
   
    }
	socket.on('disconnect',function(){

   		alert("connection lost the page will reload once dialog closed");
   		location.reload();


	});

});
