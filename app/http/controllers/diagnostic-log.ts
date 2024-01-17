import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { IPrimaryKey } from "../../../internal/common/types/id";
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

    public async list(req: FastifyRequest, reply: FastifyReply) {
        return await this.diagnosticLog.getCountedList(50, 0);
    }

    public async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.body as IPrimaryKey;
        this.diagnosticLog.delete(id);
    }
}

export const DiagnosticLogController = new Controller(DiagnosticLogManagerInstance);
