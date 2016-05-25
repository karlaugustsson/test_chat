"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var online_users_component_1 = require("./online-users.component");
var chat_service_1 = require("../services/chat.service");
var router_1 = require('@angular/router');
var login_service_1 = require("../services/login.service");
var user_service_1 = require("../services/user.service");
var ChatComponent = (function () {
    function ChatComponent(_chatservice, router, _loginService, _userService) {
        this._chatservice = _chatservice;
        this.router = router;
        this._loginService = _loginService;
        this._userService = _userService;
        this.message = "";
        this.chat_box_items = [];
        this.user_exist = true;
        this.error_message = "";
        this.whisper = false;
        this.file_reader = new FileReader();
        this.message_archive = [];
        this.message_cursor = this.message_archive.length - 1;
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.isOnline();
        this.chat_subscribe();
    };
    ChatComponent.prototype.isOnline = function () {
        if (this._loginService.isLoggedIn() == false) {
            this.router.navigate(['/login']);
        }
        else {
            this.OnlineUser = this._loginService.get_logged_in_user();
        }
    };
    ChatComponent.prototype.chat_subscribe = function () {
        var _this = this;
        this._chatservice.get_chat_stream().subscribe(function (data) { _this.process_chat_data(data); });
    };
    ChatComponent.prototype.onSubmit = function () {
        this.whisper = (this.message.substring(0, 3) == "/w ") ? true : false;
        if (this.message.length != 0 || this.processed_image != null) {
            if (this.whisper == true) {
                this.add_to_chat_items(this.OnlineUser, this.message.substring(this.message.indexOf(" ", 3) + 1, this.message.length), this.processed_image || null, this.whisper, this.message.substring(this.message.indexOf(" ") + 1, this.message.indexOf(" ", 3)));
            }
            else {
                console.log(this.processed_image);
                this.add_to_chat_items(this.OnlineUser, this.message, this.processed_image || null, this.whisper);
            }
            this.send_message();
        }
        this.message_archive.push(this.message);
        this.message = "";
        this.error_message = "";
        this.processed_image = null;
        this.message_cursor = this.message_archive.length;
    };
    ChatComponent.prototype.process_chat_data = function (data) {
        if (typeof data == "string") {
            this.error_message = data;
        }
        else {
            this.error_message = "";
            this.add_to_chat_items(data.userName, data.message, data.file || null, data.whisper || null, (data.whisper == true) ? "you" : null);
        }
    };
    ChatComponent.prototype.add_to_chat_items = function (user, message, image, whisper, end_user) {
        if (message === void 0) { message = null; }
        if (image === void 0) { image = null; }
        if (whisper === void 0) { whisper = null; }
        if (end_user === void 0) { end_user = null; }
        var object = { username: user, message: message, image: image, whisper: whisper || null, end_user: end_user };
        this.chat_box_items.push(object);
    };
    ChatComponent.prototype.get_image = function (event) {
        var _this = this;
        this.raw_image = event.target.files[0];
        this.process_image(event.target.files[0])
            .then(function (image) {
            _this.processed_image = image;
        });
    };
    ChatComponent.prototype.process_image = function (data) {
        var _this = this;
        var test = function (resolve, reject) {
            _this.file_reader.onloadend = function (e) {
                resolve(_this.file_reader.result);
            };
        };
        this.file_reader.readAsDataURL(data);
        var promise = new Promise(test);
        return promise;
    };
    ChatComponent.prototype.send_message = function () {
        if (this._userService.get_user_count() > 0) {
            this._chatservice.update_chat_box(this.message, this.raw_image || null);
        }
    };
    ChatComponent.prototype.check_them_keys = function (event) {
        if ((event.keyCode || event.charCode) == 38) {
            this.find_msg_up();
        }
        if ((event.keyCode || event.charCode) == 40) {
            this.find_msg_down();
        }
    };
    ChatComponent.prototype.find_msg_up = function () {
        if (this.message_cursor != 0) {
            this.message_cursor--;
        }
        else {
            this.message_cursor = 0;
        }
        this.message = this.message_archive[this.message_cursor];
    };
    ChatComponent.prototype.find_msg_down = function () {
        if (this.message_cursor < this.message_archive.length - 1) {
            this.message_cursor++;
            this.message = this.message_archive[this.message_cursor];
        }
        else {
            this.message_cursor = this.message_archive.length;
            this.message = "";
        }
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: "chat",
            templateUrl: "app/html/chat.component.html",
            directives: [online_users_component_1.OnlineUsersComponent]
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, router_1.Router, login_service_1.LoginService, user_service_1.UserService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map