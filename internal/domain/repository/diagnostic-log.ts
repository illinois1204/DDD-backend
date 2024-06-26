import { Filter, ObjectId } from "mongodb";
import { IBaseCRUD } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { ISorting } from "../../common/types/sort-order";
import { noSql } from "../../db/nosql/driver";
import { NoSQLMapper } from "../../db/nosql/mapper";
import { DiagnosticLog } from "../entity/diagnostic-log";
import { IDiagnosticLogInventoryUpdate } from "../interface/diagnostic-log";

export abstract class DiagnosticLogRepository implements IBaseCRUD<DiagnosticLog> {
    async isExist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async insert(doc: Omit<DiagnosticLog, "id">): Promise<DiagnosticLog> {
        const id = (await noSql<Omit<DiagnosticLog, "id">>(DiagnosticLog.alias).insertOne(doc)).insertedId;
        return (await this.getById(id.toString())) as DiagnosticLog;
    }

    async getById(id: ID): Promise<DiagnosticLog | null | undefined> {
        const result = await noSql<DiagnosticLog>(DiagnosticLog.alias).findOne({ _id: new ObjectId(id) });
        return result ? NoSQLMapper.toEntity(result) : null;
    }

    async getByKey<K extends keyof DiagnosticLog>(key: K, value: string | number | boolean): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async count(where?: Filter<DiagnosticLog>): Promise<Number> {
        return await noSql<DiagnosticLog>(DiagnosticLog.alias).countDocuments(where || {});
    }

    async list(limit: number, offset: number, where?: Filter<DiagnosticLog>, order?: ISorting | undefined): Promise<DiagnosticLog[]> {
        const result = await noSql<DiagnosticLog>(DiagnosticLog.alias)
            .find(where || {})
            .skip(limit * offset)
            .limit(limit)
            .sort(order?.sortBy ?? "_id", "desc")
            .toArray();
        return NoSQLMapper.toArrayEntity(result);
    }

    async listAll(where?: Filter<DiagnosticLog>): Promise<DiagnosticLog[]> {
        const result = await noSql<DiagnosticLog>(DiagnosticLog.alias)
            .find(where || {})
            .toArray();
        return NoSQLMapper.toArrayEntity(result);
    }

    async updateById(id: ID, doc: Partial<Omit<DiagnosticLog, "id" | "created" | "inventory">>): Promise<DiagnosticLog | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async deleteById(id: ID | ID[]): Promise<void> {
        const transformedId = [id].flat().map((i) => new ObjectId(i));
        await noSql<DiagnosticLog>(DiagnosticLog.alias).deleteMany({ _id: { $in: transformedId } });
    }

    async updateWithInnerId(id: ID, innerId: ID, doc: IDiagnosticLogInventoryUpdate): Promise<DiagnosticLog | null | undefined> {
        const innerDoc = {};
        Object.entries(doc).forEach(([key, value]) => (innerDoc[`inventory.$.${key}`] = value));

        const result = await noSql<DiagnosticLog>(DiagnosticLog.alias).findOneAndUpdate(
            { _id: new ObjectId(id), "inventory.id": new ObjectId(innerId) },
            { $set: innerDoc },
            { returnDocument: "after" }
        );
        return result ? NoSQLMapper.toEntity(result) : null;
    }
}
