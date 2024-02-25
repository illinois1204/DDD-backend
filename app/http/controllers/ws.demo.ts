import { SocketStream } from "@fastify/websocket";
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

    public async notice(conn: SocketStream, req: FastifyRequest) {
        // console.log(req.query);
        // console.log(req.headers);
        // console.log(req.user);
        const timer = setInterval(() => conn.socket.send(this.randomDigit(1, 10).toString()), 2000);
        conn.socket.on("close", () => clearInterval(timer));
    }

    public async dialog(conn: SocketStream, req: FastifyRequest) {
        conn.socket.on("message", (data) => processMessage(data.toString()).catch(() => conn.socket.close(1011)));

        const processMessage = async (data: string) => {
            console.log(data);
            conn.socket.send(this.randomLetter());
            if (data == "ex") throw new Error("call ex");
            if (data == "q") {
                conn.socket.send("canceling...");
                conn.socket.close();
            }
        };
    }
}

export const FWSController = new Controller();
