import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { IJwt } from "../../../internal/common/types/jwt";
import { JWT } from "../../../internal/services/jwt";

@AutoBind
class Controller {
    public async login(req: FastifyRequest, reply: FastifyReply) {
        const payload: IJwt = { id: 1 };
        return { token: JWT.generate(payload) };
    }

    public async hello(req: FastifyRequest, reply: FastifyReply) {
        return { hello: "world" };
    }
}

export const authDemoController = new Controller();
