import { Order } from "../../common/constants/ordering";
import { IBaseCRUD } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { ISorting } from "../../common/types/sort-order";
import { sql } from "../../db/sql/driver";
import { Sector } from "../entity/sector";
import { SectorWhereBuilder } from "../interface/sector";

export class SectorRepository implements IBaseCRUD<Sector> {
    async isExist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(doc: Omit<Sector, "id">): Promise<Sector> {
        return (await sql<Sector>(Sector.alias).insert(doc).returning("*"))[0];
    }

    async getById(id: ID): Promise<Sector | null | undefined> {
        return await sql<Sector>(Sector.alias).where("id", id).first();
    }

    async count(where?: SectorWhereBuilder): Promise<Number> {
        const [{ count }] = await sql<Sector>(Sector.alias)
            .where(where || {})
            .count();
        return Number(count);
    }

    async list(limit: number, offset: number, where?: SectorWhereBuilder, order?: ISorting): Promise<Sector[]> {
        return await sql<Sector>(Sector.alias)
            .where(where || {})
            .offset(offset * limit)
            .limit(limit)
            .orderBy(order?.sortBy ?? "id", order?.orderBy ?? Order.DESC);
    }

    async listAll(): Promise<Sector[]> {
        return await sql<Sector>(Sector.alias);
    }

    async updateById(id: ID, doc: Partial<Omit<Sector, "id" | "created">>): Promise<Sector | null | undefined> {
        return (await sql<Sector>(Sector.alias).where("id", id).update(doc, "*"))[0];
    }

    async deleteById(id: ID): Promise<void> {
        await sql<Sector>(Sector.alias).where("id", id).del();
    }
}
