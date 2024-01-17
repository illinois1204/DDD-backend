import { Filter } from "mongodb";
import { between } from "../../common/handlers/between";
import { IRepositoryManager } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { DiagnosticLog } from "../entity/diagnostic-log";
import { IDiagnosticLogCreate, IDiagnosticLogFilter } from "../interface/diagnostic-log";
import { DiagnosticLogRepository } from "../repository/diagnostic-log";

class Manager implements IRepositoryManager<DiagnosticLog> {
    private readonly repository: DiagnosticLogRepository;
    constructor() {
        this.repository = new DiagnosticLogRepository();
    }

    async exist(id: ID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(doc: IDiagnosticLogCreate): Promise<DiagnosticLog> {
        return await this.repository.insert({ date: new Date(), ...doc });
    }

    async getOne(id: ID): Promise<DiagnosticLog | null | undefined> {
        return await this.repository.getById(id);
    }

    async getMany(id: ID[]): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async getList(filter?: IDiagnosticLogFilter, reduce?: { limit: number; offset: number } | undefined): Promise<DiagnosticLog[]> {
        const where: Filter<DiagnosticLog> = { date: between(filter?.dateFrom) };
        return reduce ? await this.repository.list(reduce.limit, reduce.offset, where) : await this.repository.listAll(where);
    }

    async getCountedList(limit: number, offset: number, filter?: IDiagnosticLogFilter, order?: ISorting | undefined): Promise<IPaginationResponse> {
        const where: Filter<DiagnosticLog> = { date: between(filter?.dateFrom) };
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
}

export abstract class DiagnosticLogManager extends Manager {}
export const DiagnosticLogManagerInstance = new Manager();
