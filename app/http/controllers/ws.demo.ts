import { WebSocket } from "@fastify/websocket";
import AutoBind from "autobind-decorator";
import { FastifyRequest } from "fastify";

@AutoBind
class Controller {
    private randomDigit(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    private randomLetter() {
        return "abcdefghijklmnopqrstuvwxyz"[this.randomDigit(1, 26)];
    }

    public async notice(socket: WebSocket, req: FastifyRequest) {
        // console.log(req.query);
        // console.log(req.user);
        const timer = setInterval(() => socket.send(this.randomDigit(1, 10).toString()), 2000);
        socket.on("close", () => clearInterval(timer));
    }

    public async dialog(socket: WebSocket, req: FastifyRequest) {
        socket.on("message", (data) => processMessage(data.toString()).catch(() => socket.close(1011)));

        const processMessage = async (data: string) => {
            console.log(data);
            socket.send(this.randomLetter());
            if (data == "ex") throw new Error("call ex");
            if (data == "q") {
                socket.send("canceling...");
                socket.close();
            }
        };
    }
}

export const wsController = new Controller();
