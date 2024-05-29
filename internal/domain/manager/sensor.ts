import { IRepositoryManager } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { Sensor } from "../entity/sensor";
import { ISensorCreate, ISensorFilter, ISensorUpdate, SensorWhereBuilder } from "../interface/sensor";
import { SensorRepository } from "../repository/sensor";

export abstract class SensorManager extends SensorRepository implements IRepositoryManager<Sensor> {
    async exist(id: ID): Promise<boolean> {
        return await this.isExist(id);
    }

    async create(doc: ISensorCreate): Promise<Sensor> {
        return await this.insert(doc);
    }

    async getOne(id: ID): Promise<Sensor | null | undefined> {
        return await this.getById(id);
    }

    async getMany(id: ID[]): Promise<Sensor[]> {
        const where: SensorWhereBuilder = (plotter) => plotter.whereIn("id", id);
        return await this.listAll(where);
    }

    async getList(filter?: any, reduce?: { limit: number; offset: number } | undefined): Promise<Sensor[]> {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        return reduce ? await this.list(reduce.limit, reduce.offset, where) : await this.listAll(where);
    }

    async getCountedList(limit: number, offset: number, filter?: ISensorFilter, order?: ISorting | undefined): Promise<IPaginationResponse<Sensor>> {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        const total = await this.count(where);
        const body = await this.list(limit, offset, where);
        return { total, body };
    }

    async updateOne(id: ID, doc: ISensorUpdate): Promise<Sensor | null | undefined> {
        return await this.updateById(id, doc);
    }

    async delete(id: ID | ID[]): Promise<void> {
        await this.deleteById(id);
    }

    private makeListingWhere(filter: ISensorFilter): SensorWhereBuilder {
        return (plotter) => {
            if (filter.sector) plotter.whereIn("sector", filter.sector);
            return plotter;
        };
    }

    async getFreeSensors(limit: number, offset: number): Promise<IPaginationResponse<Sensor>> {
        const where: SensorWhereBuilder = (plotter) => plotter.whereNull("sector");
        const total = await this.count(where);
        const body = await this.list(limit, offset, where);
        return { total, body };
    }
}

class Manager extends SensorManager {}
export const SensorManagerInstance = new Manager();
