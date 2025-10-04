import { Socket, io } from "socket.io-client";

class SocketController {
    readonly socket: Socket;

    constructor() {
        this.socket = io(process.env.SOCKET_URL!);
    }
}

export default SocketController;