import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { IPagination } from "../../../internal/common/types/pagination";
import { SensorDataService } from "../../../internal/domain/service/sensor.data";

@AutoBind
class Controller {
    constructor(private readonly sensorData: SensorDataService) {}

    public async list(req: FastifyRequest, reply: FastifyReply) {
        const { limit, offset } = req.query as IPagination;
        return await this.sensorData.getCountedList(limit, offset);
    }
}

export const SensorDataController = new Controller(new SensorDataService());
