import { Order } from "../../common/constants/ordering";
import { IBaseCRUD } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { ISorting } from "../../common/types/sort-order";
import { sql } from "../../db/sql/driver";
import { Sensor } from "../entity/sensor";
import { SensorWhereBuilder } from "../interface/sensor";

export class SectorRepository implements IBaseCRUD<Sensor> {
    async isExist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(doc: Omit<Sensor, "id">): Promise<Sensor> {
        return (await sql<Sensor>(Sensor.alias).insert(doc).returning("*"))[0];
    }

    async getById(id: ID): Promise<Sensor | null | undefined> {
        return await sql<Sensor>(Sensor.alias).where("id", id).first();
    }

    async count(where?: SensorWhereBuilder): Promise<Number> {
        const [{ count }] = await sql<Sensor>(Sensor.alias)
            .where(where || {})
            .count();
        return Number(count);
    }

    async list(limit: number, offset: number, where?: SensorWhereBuilder, order?: ISorting | undefined): Promise<Sensor[]> {
        return await sql<Sensor>(Sensor.alias)
            .where(where || {})
            .offset(offset * limit)
            .limit(limit)
            .orderBy(order?.sortBy ?? "id", order?.orderBy ?? Order.DESC);
    }

    async listAll(): Promise<Sensor[]> {
        throw new Error("Method not implemented.");
    }

    async updateById(id: ID, doc: Partial<Omit<Sensor, "id" | "created">>): Promise<Sensor | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async deleteById(id: ID): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
