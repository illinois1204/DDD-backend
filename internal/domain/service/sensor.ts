import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { ISensorCreate, ISensorFilter, ISensorUpdate, SensorWhereBuilder } from "../interface/sensor";
import { SensorRepository } from "../repository/sensor";

export class SensorService {
    private readonly repository: SensorRepository;
    constructor() {
        this.repository = new SensorRepository();
    }

    async new(doc: ISensorCreate) {
        return await this.repository.create(doc);
    }

    async getOne(id: ID) {
        return await this.repository.getById(id);
    }

    async getList(limit: number, offset: number, filter?) {
        return await this.repository.list(limit, offset);
    }

    async getCountedList(limit: number, offset: number, filter?: ISensorFilter, order?: ISorting): Promise<IPaginationResponse> {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        const total = await this.repository.count(where);
        const body = await this.repository.list(limit, offset, where);
        return { total, body };
    }

    async getFreeSensors(limit: number, offset: number): Promise<IPaginationResponse> {
        const where: SensorWhereBuilder = (plotter) => plotter.whereNull("sector");
        const total = await this.repository.count(where);
        const body = await this.repository.list(limit, offset, where);
        return { total, body };
    }

    async updateOne(id: ID, doc: ISensorUpdate) {
        return await this.repository.updateById(id, doc);
    }

    async delete(id: ID | ID[]) {
        await this.repository.deleteById(id);
    }

    private makeListingWhere(filter: ISensorFilter): SensorWhereBuilder {
        return (plotter) => {
            if (filter.sector) plotter.whereIn("sector", filter.sector);
            return plotter;
        };
    }
}
