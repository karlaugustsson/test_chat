$( document ).ready(function() {
    
    
    var portNumber = 3000;
    var socket = io(window.location.host).connect();
    var message_data = {};
    var username;

    var valid_img_ext = [".jpg" , ".jpeg" , ".png" , ".gif"];
    var allowed_image_size = 10485760;
    
    var error_box = $("#errorBox");	

    var username_container = $("#username_container");
    var loginForm = $("#loginForm");
    var nameField = $("#nameField");
    var username_form = $("#nameForm");
    
    
    
    var chatApp = $("#chatApp");
    var users_online_container = $("#online_container");
    var users_online_box = $("#usersOnlineBox");
    var users_online_box_small = $("#num_users_online");
    
    var message_container = $("#message_container")
    var message_form = $("#chatForm");
    var message_box = $("#chatBox");
    var chat_field = $("#chatField");
    var image_file = $("#upload-image");
    var image_button = $("#imageButton");


    

 	message_container.hide();
 	users_online_container.hide();
    error_box.hide();

image_file.on("change",function(e){

	var file = e.target.files[0];

	if(file === undefined){
		style_image_button(undefined);
		return;
	}
	if( validate_image_data(file) == true ){
		
		message_data.file = {data:file,type:file.type , originalName:file.name }
		style_image_button(file);
		clear_error_box();
	}else{
	
		image_file.val("");
		delete message_data.file ; 
		image_file.trigger("change");

		display_error("invalid filetype or filesize must not exceed:" + allowed_image_size + " bytes");
	}
    



});


    	username_form.on("submit",function(e){
    	
    	e.preventDefault();
    	
    	username = strip_tags(nameField.val());

    	if(username.length <= 0 ){

    		display_error("please enter a name");
    		return;
    	}
    	if(valid_username_input(username) == true){
	    	
	    	socket.emit("user_exist",{userName:username},function(answer){
	    		
	    		if(answer == false){

	    			chat_field.val("");
	    			start_chat(username);
	    			clear_error_box();

	    		}else{
	    			display_error("sorry, that username has been taken or is invalid")
	    		}

	    	});		
    	}else{
    		display_error("no spaces for god sake");
    		return;
    	}
    	

    });


    message_form.on("submit" , function(e){

    	e.preventDefault();
    
    	message_data.message = get_message_data();

    	if(message_data.message === false && message_data.file === undefined ){

    		return;
    	}

    	new_message(message_data);

    	
    	
    })
    socket.on("update_users_online_list",function(users){

   			
    		users_online_box.html("");
   			users_online_box_small.html("<span class=\"user\">" + users.length + (users.length == 1 ? " user" : " users")+" online</span>" )
    		users.map(function(user){
    			console.log(user);
    			var me = ( username == user ) ? " me" : "" ;
    			users_online_box.append('<span class="user' + me + '">' + user + '</span>');
    			
    		});				



    });
    socket.on("update_chat_box",function(data){
    		 	var username = data.userName  ;
 				var message = data.message  ; 
 				var whisper = data.whisper ; 
 				var file = data.file;
 				console.log(data);
 				if(file != undefined || file != null){
 	
 				bytes = file.data;

 				message_box.append("<p>" +  username  +": sent a " + ( whisper !== undefined ? "private " : "") + "image </p>")
 				message_box.append('<img src="data:'+ file.type +';base64,' + escape(bytes) + '" height="auto" width="100px">');
 				message_box.scrollTop(999999999);

 				
 			}
 			console.log(message);
 			if(message != false){

 				if(whisper !== undefined){
 					message_box.append( "<p><span class=\"whisper\">" + username + " whispers</span>:" + message + "</p>");
 				}else{

 					message_box.append( "<p>" + username  + ":" + message  + "</p>");
 				}
 				
 				message_box.scrollTop(999999999);

 			}
    		
    });

    function start_chat(){
    username_container.hide();
    message_container.show()
    users_online_container.show();
   
   
    }

    function get_message_data(){

    	if(chat_field.val() != ""){
    		return strip_tags(chat_field.val());
    	}
    	return false;
    }

    function new_message(data){
    	
    	socket.emit("send_message",data,function(error){
    		display_error(error)
    	});
    }

	socket.on('disconnect',function(){

   		alert("connection lost ,  the page will reload once dialog closed lets hope the service is back or else !");
   		location.reload();


	});
	socket.on("clear_inputs",function(){
		clear_error_box();
    	chat_field.val("");
    	delete message_data.file;
 		style_image_button(undefined);
	})
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

        for (var i = 0; i < valid_img_ext.length; i++) {
        			
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
	function style_image_button(data){
		file = data;

		if(file === undefined){
			image_button.css('background-image','');
			if(image_button.hasClass("img_appended")){
				image_button.removeClass("img_appended");
			}
			
			return ;
		}

		reader = new FileReader();
		reader.onloadend = function(){
			image_button.css('background-image','url("'+ reader.result +'")');
			image_button.addClass("img_appended");
	
		}
		reader.readAsDataURL(file);
		

	}

	function strip_tags(text){
		var regex = /(<([^>]+)>)/ig
		return text.replace(regex, "");
	}

	function valid_username_input(data){
		var pattern = /\s/g
		console.log(data.match(pattern));
		if (data.match(pattern) === null){
			return true
		}
		return false
	}

});
