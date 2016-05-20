
import {SOCKET} from "../mocks/socket";
export class SocketService{
	
	get_socket_connection() {

	return Promise.resolve(SOCKET);

	}
}