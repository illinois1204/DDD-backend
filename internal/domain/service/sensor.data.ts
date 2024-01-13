import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { SensorDataRepository } from "../repository/sensor.data";

export class SensorDataService {
    private readonly repository: SensorDataRepository;
    constructor() {
        this.repository = new SensorDataRepository();
    }

    async getCountedList(limit: number, offset: number, filter?: any, order?: ISorting): Promise<IPaginationResponse> {
        const total = await this.repository.count();
        const body = await this.repository.list(limit, offset, undefined, order?.sortBy ? order : undefined);
        return { total, body };
    }
}
