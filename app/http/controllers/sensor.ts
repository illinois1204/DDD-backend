import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { HandlingErrorType } from "../../../internal/common/enums/errors";
import { ID, IPrimaryKey } from "../../../internal/common/types/id";
import { IPagination } from "../../../internal/common/types/pagination";
import { ISensorCreate, ISensorFilter, ISensorUpdate } from "../../../internal/domain/interface/sensor";
import { SectorService } from "../../../internal/domain/service/sector";
import { SensorService } from "../../../internal/domain/service/sensor";
import { IHandlingResponseError } from "../config/http-response";
import { HttpStatus } from "../config/http-status";

@AutoBind
class Controller {
    constructor(
        private readonly sensor: SensorService,
        private readonly sector: SectorService
    ) {}

    public async create(req: FastifyRequest, reply: FastifyReply) {
        const doc = req.body as ISensorCreate;
        if (!(await this.sector.exist(doc.sector))) {
            const info: IHandlingResponseError = { property: "sector", type: HandlingErrorType.FOUND };
            reply.code(HttpStatus.NOT_FOUND);
            return info;
        }
        const data = await this.sensor.new(doc);
        reply.code(HttpStatus.CREATED).send(data);
    }

    public async list(req: FastifyRequest, reply: FastifyReply) {
        const { limit, offset, ...filter } = req.query as IPagination & ISensorFilter;
        return await this.sensor.getCountedList(limit, offset, filter);
    }

    public async listFree(req: FastifyRequest, reply: FastifyReply) {
        const { limit, offset } = req.query as IPagination;
        return await this.sensor.getFreeSensors(limit, offset);
    }

    public async getOne(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as IPrimaryKey;
        const data = await this.sensor.getOne(id);
        if (data) return data;
        else reply.code(404);
    }

    public async updateOne(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as IPrimaryKey;
        const doc = req.body as ISensorUpdate;

        if (doc.sector && (await this.sector.exist(doc.sector as ID)) == false) {
            const info: IHandlingResponseError = { property: "sector", type: HandlingErrorType.FOUND };
            reply.code(HttpStatus.NOT_FOUND);
            return info;
        }
        const data = await this.sensor.updateOne(id, doc);
        if (data) return data;
        else reply.code(404);
    }

    public async deleteOne(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as IPrimaryKey;
        await this.sensor.deleteOne(id);
        reply.code(HttpStatus.NO_CONTENT).send();
    }
}

export const SensorController = new Controller(new SensorService(), new SectorService());
