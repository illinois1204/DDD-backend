import { IRepositoryManager } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { DiagnosticLog } from "../entity/diagnostic-log";
import { IDiagnosticLogCreate } from "../interface/diagnostic-log";
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

    async getList(filter?: any, reduce?: { limit: number; offset: number } | undefined): Promise<DiagnosticLog[]> {
        throw new Error("Method not implemented.");
    }

    async getCountedList(limit: number, offset: number, filter?: any, order?: ISorting | undefined): Promise<IPaginationResponse> {
        throw new Error("Method not implemented.");
    }

    async updateOne(id: ID, doc: Partial<Omit<DiagnosticLog, "id" | "created">>): Promise<DiagnosticLog | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async delete(id: ID | ID[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export abstract class DiagnosticLogManager extends Manager {}
export const DiagnosticLogManagerInstance = new Manager();
