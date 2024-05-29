import AutoBind from "autobind-decorator";
import { FastifyReply, FastifyRequest } from "fastify";
import { ID } from "../../../internal/common/types/id";
import { IPagination } from "../../../internal/common/types/pagination";
import { SensorData } from "../../../internal/domain/entity/sensor.data";
import { SectorManager, SectorManagerInstance } from "../../../internal/domain/manager/sector";
import { SensorManager, SensorManagerInstance } from "../../../internal/domain/manager/sensor";
import { SensorDataManager, SensorDataManagerInstance } from "../../../internal/domain/manager/sensor.data";

@AutoBind
class Controller {
    constructor(
        private readonly sensorData: SensorDataManager,
        private readonly sensor: SensorManager,
        private readonly sector: SectorManager
    ) {}

    public async list(req: FastifyRequest, reply: FastifyReply) {
        const { limit, offset } = req.query as IPagination;
        return await this.sensorData.getCountedList(limit, offset);
    }

    public async listExtended(req: FastifyRequest, reply: FastifyReply) {
        const { limit, offset } = req.query as IPagination;
        const { total, body } = await this.sensorData.getCountedList(limit, offset);
        const sensorsData = body as SensorData[];

        const sensorIdList = sensorsData.map((i) => i.sensor as ID);
        const sensorEntities = await this.sensor.getMany(sensorIdList);

        const sectorIdList = sensorEntities.map((i) => i.sector as ID);
        const sectorEntities = await this.sector.getMany(sectorIdList);

        const buildedResponse = sensorsData.map<SensorData>((row) => {
            const [sensor] = sensorEntities.filter((i) => i.id == row.sensor);
            row.sensor = sensor ?? null;
            if (sensor) {
                const [sector] = sectorEntities.filter((i) => i.id == sensor.sector);
                row.sensor.sector = sector ?? null;
            }
            return row;
        });
        return { total, body: buildedResponse };
    }
}

export const sensorDataController = new Controller(SensorDataManagerInstance, SensorManagerInstance, SectorManagerInstance);
