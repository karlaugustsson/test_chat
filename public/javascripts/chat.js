$( document ).ready(function() {
    
    var username_form = $("#nameForm");
    var portNumber = 3000;
    var nameField = $("#nameField");
    var socket = io("http://localhost:" + portNumber ).connect();
    var error_box = $("#errorBox");	
    var loginForm = $("#loginForm");
    var chatApp = $("#chatApp");
    var online_users_box = $("#usersOnline");
    var message_field = $("#messageField");
    var message_form = $("#messageForm");
    var message_box = $("#chatBox")
	

});