import { Filter, ObjectId } from "mongodb";
import { between } from "../../common/handlers/between";
import { IRepositoryManager } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { noSql } from "../../db/nosql/driver";
import { DiagnosticLog, Inventory } from "../entity/diagnostic-log";
import {
    IDiagnosticLogCreate,
    IDiagnosticLogFilter,
    IDiagnosticLogInventoryCreate,
    IDiagnosticLogInventoryUpdate
} from "../interface/diagnostic-log";
import { DiagnosticLogRepository } from "../repository/diagnostic-log";

class Repository extends DiagnosticLogRepository {}
export abstract class DiagnosticLogManager implements IRepositoryManager<DiagnosticLog> {
    private readonly repository: DiagnosticLogRepository;
    constructor() {
        this.repository = new Repository();
    }

    async exist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(doc: IDiagnosticLogCreate): Promise<DiagnosticLog> {
        doc.inventory?.forEach((i) => (i.id = new ObjectId()));
        return await this.repository.insert({ ...doc, date: new Date() });
    }

    async getOne(id: ID): Promise<DiagnosticLog | null | undefined> {
        return await this.repository.getById(id);
    }

    async getMany(id: ID[]): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async getList(filter?: IDiagnosticLogFilter, reduce?: { limit: number; offset: number } | undefined): Promise<DiagnosticLog[]> {
        const where: Filter<DiagnosticLog> = { date: between(filter?.dateFrom, filter?.dateTo) };
        return reduce ? await this.repository.list(reduce.limit, reduce.offset, where) : await this.repository.listAll(where);
    }

    async getCountedList(
        limit: number,
        offset: number,
        filter?: IDiagnosticLogFilter,
        order?: ISorting
    ): Promise<IPaginationResponse<DiagnosticLog>> {
        const where: Filter<DiagnosticLog> = { date: between(filter?.dateFrom, filter?.dateTo) };
        const total = await this.repository.count(where);
        const body = await this.repository.list(limit, offset, where);
        return { total, body };
    }

    async updateOne(id: ID, doc: Partial<Omit<DiagnosticLog, "id" | "created">>): Promise<DiagnosticLog | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async delete(id: ID | ID[]): Promise<void> {
        await this.repository.deleteById(id);
    }

    async updateInventory(id: ID, inventoryId: ID, doc: IDiagnosticLogInventoryUpdate): Promise<Inventory | null | undefined> {
        const result = await this.repository.updateWithInnerId(id, inventoryId, doc);
        return result?.inventory?.find((i) => i.id == inventoryId);
    }

    // как вариант не юзать репозиторий для вложенных сущностей (работать прям в менеджере) (хз)
    //
    async addInventory(id: ID, doc: IDiagnosticLogInventoryCreate) {
        const inventoryId = new ObjectId();

        const result = await noSql<DiagnosticLog>(DiagnosticLog.alias).findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $push: { inventory: { ...doc, id: inventoryId } } },
            { returnDocument: "after" }
        );
        console.log(result);
        return result?.inventory?.find((i) => i.id == inventoryId.toString());
    }

    async pullInventory(id: ID, inventoryId: ID | ID[]): Promise<void> {
        const transformedId = [inventoryId].flat().map((i) => new ObjectId(i));
        await noSql<DiagnosticLog>(DiagnosticLog.alias).updateOne(
            { _id: new ObjectId(id) },
            { $pull: { inventory: { id: { $in: transformedId } } } }
        );
    }
}

class Manager extends DiagnosticLogManager {}
export const DiagnosticLogManagerInstance = new Manager();
