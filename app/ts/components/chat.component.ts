import {Component , OnInit , Injectable} from "@angular/core";
import {OnlineUsersComponent} from "./online-users.component";
import { ChatService } from "../services/chat.service";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";

@Component({
	selector: "chat",
	templateUrl: "app/html/chat.component.html",
	directives: [OnlineUsersComponent]
})

export class ChatComponent implements OnInit {
	message: string = "";
	chat_box_items: Array<any> = [];
	OnlineUser: string;
	user_exist = true;
	error_message: string = "";
	whisper: boolean = false;
	processed_image;
	file_reader = new FileReader();
	message_archive: Array<any> = [];
	message_cursor = this.message_archive.length - 1;

	ngOnInit() {
		this.isOnline();
		this.chat_subscribe();
	}
	constructor(private _chatservice: ChatService, private router: Router, private _loginService: LoginService, private _userService: UserService) { }
	isOnline() {
		if (this._loginService.isLoggedIn() == false) {

			this.router.navigate(['/login']);
		} else {
			this.OnlineUser = this._loginService.get_logged_in_user();
		}

	}


	chat_subscribe() {
		this._chatservice.get_chat_stream().subscribe((data) => { this.process_chat_data(data) })
	}
	onSubmit() {
		this.whisper = (this.message.substring(0, 3) == "/w ") ? true : false;

		if (this.message.length != 0 || this.processed_image != null) {
			if (this.whisper == true) {

				this.add_to_chat_items(
					this.OnlineUser,
					this.message.substring(this.message.indexOf(" ", 3) + 1, this.message.length),
					this.processed_image || null,
					this.whisper,
					this.message.substring(this.message.indexOf(" ") + 1, this.message.indexOf(" ", 3))


				)
			} else {
				this.add_to_chat_items(
					this.OnlineUser,
					this.message,
					this.processed_image || null,
					this.whisper);
			}


			this.send_message();
		}
		this.message_archive.push(this.message);
		this.message = "";
		this.error_message = "";
		this.processed_image = null;
		this.message_cursor = this.message_archive.length;

	}
	process_chat_data(data) {

		if (typeof data == "string") {
			this.error_message = data;
		} else {
			this.error_message = "";
			this.add_to_chat_items(data.userName, data.message, data.file || null, data.whisper || null, (data.whisper == true) ? "you" : null)
		}
	}
	add_to_chat_items(user, message = null, image = null, whisper = null, end_user = null) {
		let object = { username: user, message: message, image: image, whisper: whisper || null, end_user };

		this.chat_box_items.push(object);
	}
	get_image(event) {

		this.process_image(event.target.files[0])
			.then((image) => {
				this.processed_image = image;

			});
	}
	process_image(data) {

		let test = (resolve, reject) => {
			this.file_reader.onloadend = (e) => {

				resolve(this.file_reader.result);

			}

		}
		this.file_reader.readAsDataURL(data);


		let promise = new Promise(test);
		return promise;

	}
	send_message() {
		if (this._userService.get_user_count() > 0) {
			this._chatservice.update_chat_box(this.message, this.processed_image || null);
		}

	}
	check_them_keys(event) {
		if ((event.keyCode || event.charCode) == 38) {
			this.find_msg_up();
		}
		if ((event.keyCode || event.charCode) == 40) {
			this.find_msg_down();
		}
	}
	find_msg_up() {

		if (this.message_cursor != 0) {
			this.message_cursor--;
		} else {
			this.message_cursor = 0;

		}
		this.message = this.message_archive[this.message_cursor];

	}
	find_msg_down() {
		if (this.message_cursor < this.message_archive.length -1) {
		
				this.message_cursor++;
	

			this.message = this.message_archive[this.message_cursor];

		} else {
			this.message_cursor = this.message_archive.length;
			this.message = "";

		}
		
	}
}