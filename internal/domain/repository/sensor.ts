import { Order } from "../../common/constants/ordering";
import { IBaseCRUD } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { ISorting } from "../../common/types/sort-order";
import { sql } from "../../db/sql/driver";
import { Sensor } from "../entity/sensor";
import { SensorWhereBuilder } from "../interface/sensor";

export class SensorRepository implements IBaseCRUD<Sensor> {
    async isExist(id: ID): Promise<boolean> {
        const [{ count }] = await sql<Sensor>(Sensor.alias).where("id", id).count();
        return Boolean(Number(count));
    }

    async insert(doc: Omit<Sensor, "id">): Promise<Sensor> {
        return (await sql<Sensor>(Sensor.alias).insert(doc).returning("*"))[0];
    }

    async getById(id: ID): Promise<Sensor | null | undefined> {
        return await sql<Sensor>(Sensor.alias).where("id", id).first();
    }

    async getByKey<K extends keyof Sensor>(key: K, value: string | number | boolean): Promise<Sensor[]> {
        return await sql<Sensor>(Sensor.alias).where(key, value);
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

    async listAll(where?: SensorWhereBuilder): Promise<Sensor[]> {
        return await sql<Sensor>(Sensor.alias).where(where || {});
    }

    async updateById(id: ID, doc: Partial<Omit<Sensor, "id" | "created">>): Promise<Sensor | null | undefined> {
        return (await sql<Sensor>(Sensor.alias).where("id", id).update(doc, "*"))[0];
    }

    async deleteById(id: ID | ID[]): Promise<void> {
        const condition: SensorWhereBuilder = (plotter) => (Array.isArray(id) ? plotter.whereIn("id", id) : plotter.where("id", id));
        await sql<Sensor>(Sensor.alias).where(condition).del();
    }
}
