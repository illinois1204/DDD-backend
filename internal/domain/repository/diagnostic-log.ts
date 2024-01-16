import { ObjectId } from "mongodb";
import { IBaseCRUD } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { ISorting } from "../../common/types/sort-order";
import { noSql } from "../../db/nosql/driver";
import { DiagnosticLog } from "../entity/diagnostic-log";

export class DiagnosticLogRepository implements IBaseCRUD<DiagnosticLog> {
    async isExist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async insert(doc: Omit<DiagnosticLog, "id">): Promise<DiagnosticLog> {
        const id = (await noSql<Omit<DiagnosticLog, "id">>(DiagnosticLog.alias).insertOne(doc)).insertedId;
        return (await this.getById(id.toString())) as DiagnosticLog;
    }

    async getById(id: ID): Promise<DiagnosticLog | null | undefined> {
        const result = await noSql<DiagnosticLog>(DiagnosticLog.alias).findOne({ _id: new ObjectId(id) });
        const { _id, ...rest } = result || {};
        return _id ? ({ id: _id.toString(), ...rest } as DiagnosticLog) : null; // TODO: нужен маппер
        // if (result) {
        //     const { _id, ...rest } = result;
        //     rest.id = _id.toString();
        //     return { ...rest };
        // }
    }

    async getByKey<K extends keyof DiagnosticLog>(key: K, value: string | number | boolean): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async count(where?: any): Promise<Number> {
        throw new Error("Method not implemented.");
    }

    async list(limit: number, offset: number, where?: any, order?: ISorting | undefined): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async listAll(where?: any): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async updateById(id: ID, doc: Partial<Omit<DiagnosticLog, "id" | "created">>): Promise<DiagnosticLog | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async deleteById(id: ID | ID[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
