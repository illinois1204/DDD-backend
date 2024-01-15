import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { ISensorDataCreate } from "../interface/sensor.data";
import { SensorDataRepository } from "../repository/sensor.data";

class Manager {
    private readonly repository: SensorDataRepository;
    constructor() {
        this.repository = new SensorDataRepository();
    }

    async new(doc: ISensorDataCreate) {
        return await this.repository.create(doc);
    }

    async getCountedList(limit: number, offset: number, filter?: any, order?: ISorting): Promise<IPaginationResponse> {
        const total = await this.repository.count();
        const body = await this.repository.list(limit, offset, undefined, order?.sortBy ? order : undefined);
        return { total, body };
    }
}

export abstract class SensorDataManager extends Manager {}
export const SensorDataManagerInstance = new Manager();
