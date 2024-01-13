import { Order } from "../../common/constants/ordering";
import { IBaseCRUD } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { ISorting } from "../../common/types/sort-order";
import { sql } from "../../db/sql/driver";
import { SensorData } from "../entity/sensor.data";

export class SensorDataRepository implements IBaseCRUD<SensorData> {
    async isExist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(doc: Omit<SensorData, "id">): Promise<SensorData> {
        throw new Error("Method not implemented.");
    }

    async getById(id: ID): Promise<SensorData | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async getByKey<K extends keyof SensorData>(key: K, value: string | number | boolean): Promise<SensorData[]> {
        throw new Error("Method not implemented.");
    }

    async count(where?: any): Promise<Number> {
        const [{ count }] = await sql<SensorData>(SensorData.alias)
            .where(where || {})
            .count();
        return Number(count);
    }

    async list(limit: number, offset: number, where?: any, order?: ISorting | undefined): Promise<SensorData[]> {
        return await sql<SensorData>(SensorData.alias)
            .where(where || {})
            .offset(offset * limit)
            .limit(limit)
            .orderBy(order?.sortBy ?? "id", order?.orderBy ?? Order.DESC);
    }

    async listAll(): Promise<SensorData[]> {
        throw new Error("Method not implemented.");
    }

    async updateById(id: ID, doc: Partial<Omit<SensorData, "id" | "created">>): Promise<SensorData | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async deleteById(id: ID | ID[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
