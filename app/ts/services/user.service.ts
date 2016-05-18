import { Injectable } from "@angular/core";
import { USERS } from "../mocks/users.mock";
@Injectable()

export class UserService{
	
	get_all_users(){
		return Promise.resolve(USERS);
	}
	add_new_user(username:string){
		USERS.push({UserName:username})
	}
}