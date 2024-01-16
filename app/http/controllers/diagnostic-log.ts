import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { IDiagnosticLogCreate } from "../../../internal/domain/interface/diagnostic-log";
import { DiagnosticLogManager, DiagnosticLogManagerInstance } from "../../../internal/domain/manager/diagnostic-log";
import { HttpStatus } from "../config/http-status";

@AutoBind
class Controller {
    constructor(private readonly diagnosticLog: DiagnosticLogManager) {}

    public async new(req: FastifyRequest, reply: FastifyReply) {
        const doc = req.body as IDiagnosticLogCreate;
        const data = await this.diagnosticLog.create(doc);
        reply.code(HttpStatus.CREATED).send(data);
    }

    public async getOne(req: FastifyRequest, reply: FastifyReply) {
        console.log(await this.diagnosticLog.getOne("65a6c4d39171f97f7fdeeecb"));
    }
}

export const DiagnosticLogController = new Controller(DiagnosticLogManagerInstance);
