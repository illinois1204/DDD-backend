import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { IPrimaryKey } from "../../../internal/common/types/id";
import { IPagination } from "../../../internal/common/types/pagination";
import { ISorting } from "../../../internal/common/types/sort-order";
import { ISectorCreate, ISectorFilter, ISectorUpdate } from "../../../internal/domain/interface/sector";
import { SectorManager, SectorManagerInstance } from "../../../internal/domain/manager/sector";
import { HttpStatus } from "../config/http-status";

@AutoBind
class Controller {
    constructor(private readonly sector: SectorManager) {}

    public async new(req: FastifyRequest, reply: FastifyReply) {
        const doc = req.body as ISectorCreate;
        const data = await this.sector.create(doc);
        reply.code(HttpStatus.CREATED).send(data);
    }

    public async list(req: FastifyRequest, reply: FastifyReply) {
        const { limit, offset, sortBy, orderBy, ...filter } = req.query as IPagination & ISorting & ISectorFilter;
        return await this.sector.getCountedList(limit, offset, filter, { sortBy, orderBy });
    }

    public async getOne(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as IPrimaryKey;
        const data = await this.sector.getOne(id);
        if (data) return data;
        else reply.code(404);
    }

    public async updateOne(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as IPrimaryKey;
        const doc = req.body as ISectorUpdate;
        const data = await this.sector.updateOne(id, doc);
        if (data) return data;
        else reply.code(404);
    }

    public async deleteOne(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as IPrimaryKey;
        await this.sector.delete(id);
        reply.code(HttpStatus.NO_CONTENT).send();
    }
}

export const SectorController = new Controller(SectorManagerInstance);
