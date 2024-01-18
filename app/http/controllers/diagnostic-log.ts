import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { ID, IPrimaryKey } from "../../../internal/common/types/id";
import { IDiagnosticLogCreate, IDiagnosticLogInventoryUpdate } from "../../../internal/domain/interface/diagnostic-log";
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
        const { id } = req.params as IPrimaryKey;
        const data = await this.diagnosticLog.getOne(id);
        if (data) return data;
        else reply.code(HttpStatus.NOT_FOUND);
    }

    public async list(req: FastifyRequest, reply: FastifyReply) {
        return await this.diagnosticLog.getCountedList(100, 0);
    }

    public async updateInventory(req: FastifyRequest, reply: FastifyReply) {
        const { id, inventoryId, ...doc } = req.body as { id: ID; inventoryId: ID } & IDiagnosticLogInventoryUpdate;
        const data = await this.diagnosticLog.updateInventory(id, inventoryId, doc);
        if (data) return data;
        else reply.code(HttpStatus.NOT_FOUND);
    }

    public async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.body as IPrimaryKey;
        this.diagnosticLog.delete(id);
    }
}

export const DiagnosticLogController = new Controller(DiagnosticLogManagerInstance);
