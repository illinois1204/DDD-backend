import { IRepositoryManager } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { SensorData } from "../entity/sensor.data";
import { ISensorDataCreate } from "../interface/sensor.data";
import { SensorDataRepository } from "../repository/sensor.data";

export abstract class SensorDataManager extends SensorDataRepository implements IRepositoryManager<SensorData> {
    async exist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(doc: ISensorDataCreate): Promise<SensorData> {
        return await this.insert(doc);
    }

    async getOne(id: ID): Promise<SensorData | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async getMany(id: ID[]): Promise<SensorData[]> {
        throw new Error("Method not implemented.");
    }

    async getList(filter?: any, reduce?: { limit: number; offset: number } | undefined): Promise<SensorData[]> {
        throw new Error("Method not implemented.");
    }

    async getCountedList(limit: number, offset: number, filter?: any, order?: ISorting | undefined): Promise<IPaginationResponse<SensorData>> {
        const total = await this.count();
        const body = await this.list(limit, offset, undefined, order?.sortBy ? order : undefined);
        return { total, body };
    }

    async updateOne(id: ID, doc: Partial<Omit<SensorData, "id" | "created">>): Promise<SensorData | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async delete(id: ID | ID[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class Manager extends SensorDataManager {}
export const SensorDataManagerInstance = new Manager();
