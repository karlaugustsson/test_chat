$( document ).ready(function() {
    
    
    var portNumber = 3000;

    var valid_img_ext = [".jpg" , ".jpeg" , ".png" , ".gif"];
    var allowed_image_size = 100000;
    var loggedIn = false;


    var nameField = $("#nameField");
    var username_form = $("#nameForm");

    var socket = io("http://localhost:" + portNumber ).connect();
    
    var error_box = $("#errorBox");	
    

    var loginForm = $("#loginForm");
    var chatApp = $("#chatApp");
    var users_online_container = $("#online_container");
    var users_online_box = $("#usersOnlineBox");
    var chat_field = $("#chatField");
    var message_form = $("#chatForm");
    var message_box = $("#chatBox");
    var image_file = $("#upload-image");
    var message_data = {};

    message_box.hide();
    message_form.hide();
    users_online_container.hide();
    users_online_box.hide();
    error_box.hide();

image_file.on("change",function(e){
	console.log("hahaha");
	if( validate_image_data(e.target.files[0]) == true ){
	
		message_data.file = {data:e.target.files[0],type:e.target.files[0].type }
	}else{
		display_error("invalid filetype or filesize must not exceed:" + allowed_image_size + " bytes");
	}
    



});


    	username_form.on("submit",function(e){
    	
    	e.preventDefault();
    	
    	var username = nameField.val();

    	if(username.length <= 0){
    		display_error("please eneter a nickname shithead");
    		return;
    	}
    	
    	socket.emit("user_exist",{userName:username},function(answer){
    		
    		if(answer == false){

    			chat_field.val("");
    			start_chat(username);
    			clear_error_box();

    		}else{
    			display_error("sorry, that username has been taken or is invalid")
    		}

    	})
    });


    message_form.on("submit" , function(e){

    	e.preventDefault();
    
    	message_data.message = get_message_data();

    	if(message_data.message === false && message_data.file === null ){

    		return;
    	}

    	new_message(message_data);

    	
    	
    })
    socket.on("update_users_online_list",function(users){

   
    		users_online_box.html("");
   
    		users.map(function(user){
    			users_online_box.append('<span class="user">' + user.userName + '</span>');
    		});				



    });
    socket.on("update_chat_box",function(data){
    		console.log(data.file);
 			if(data.file != null || data.file != ""){
 				
 				bytes = data.file.data;
 				message_box.append("<p>" + data.userName +": sent a image </p>")
 				message_box.append('<img src="data:'+ data.file.type +';base64,' + escape(bytes) + '" height="auto" width="100px">');
 				message_box.scrollTop(999999999);
 				data.file = "";
 				console.log(data.file);
 			}
 			if(data.message !== false){

 				message_box.append( "<p>" + data.userName + ":" + data.message + "</p>");
 				message_box.scrollTop(999999999);

 			}
    		
    });

    function start_chat(){
    
    username_form.hide();
    error_box.hide();

    message_box.show();
    message_form.show();
    users_online_container.show();
    users_online_box.show();
   
    }

    function get_message_data(){

    	if(chat_field.val() != ""){
    		return chat_field.val()
    	}
    	return false;
    }

    function new_message(data){

    	socket.emit("send_message",data);
    }

	socket.on('disconnect',function(){

   		alert("connection lost ,  the page will reload once dialog closed lets hope the service is back or else !");
   		location.reload();


	});
	function display_error(msg){
		error_box.show();
    	
    	error_box.html(msg);

	}

	function clear_error_box(){

		error_box.html("");
    	error_box.hide();
	}
	function validate_image_data(file){

		fileType = file.type;
		name = file.name ;
		size = file.size ;
		valid = false;

        for (var i = 0; i < valid_img_ext.length -1; i++) {
        			
                    var current_ext = valid_img_ext[i];
                    if (name.substr(name.length - current_ext.length, current_ext.length).toLowerCase() == current_ext.toLowerCase()) {
                        valid = true;
                        break;
        			}
        }

   		if ( size >= allowed_image_size ){

   			valid = false;
   		}
   		if(fileType.match(/image/gi) == false){
   	
			valid = false;
		}

        return valid === true;
		
	}

});
