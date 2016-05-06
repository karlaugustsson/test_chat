$( document ).ready(function() {
    
    var username_form = $("#nameForm");
    var portNumber = 3000;
    var nameField = $("#nameField");
    var socket = io("http://localhost:" + portNumber ).connect();
    var error_box = $(".error");	
    var loginForm = $("#loginForm");
    var chatApp = $("#chatApp");
    var online_users_box = $("#usersOnline");
    var message_field = $("#messageField");
    var message_form = $("#messageForm");
    var message_box = $("#chatbox")
	
	username_form.on("submit",function(e){
		    	
		e.preventDefault();

		var username = nameField.val();
		  
		socket.emit("find_user",{userName:username},function(data){
		error_box.html(data.toString()) ;
		return;
		});

 		
});

message_form.on("submit",function(e){
	
	e.preventDefault();
	if(message_field.val() == ""){
		return;
	}
	console.log("mamam");
	socket.emit("new_message",{"message":message_field.val()})
});
socket.on("start_chat",function(data){
	loginForm.hide();
	chatApp.show();
	error_box.html("") ;
	nameField.value = "";   
});

socket.on("update_user_list",function(data){
	
	html = "";
	

	for (var i = 0; i <= data.length -1; i++) {

		html += "<span>" + data[i].userName + "</span></br>";
	};

	online_users_box.html(html);
});

socket.on("update_them_chats",function(data){
	console.log(data);

		var html = "<span class=\"color\">" + data[0].userName + ":</span><span>"+ data[0].message + "</span></br>";


	message_box.html(message_box.html() + html);
});



});