import { FastifyReply, FastifyRequest } from "fastify";
import { IJwt } from "../../../internal/common/types/jwt";
import { HttpStatus } from "../config/http-status";

export async function UseAuth(req: FastifyRequest, reply: FastifyReply) {
    try {
        await req.jwtVerify();
        const payload = req.user as IJwt;
        // TODO: find in whitelist store...
        // if not found throw new Error();
    } catch (ex) {
        reply.code(HttpStatus.UNAUTHORIZED).send({ message: "Unauthorized action" });
    }
}
