import { IRepositoryManager } from "../../common/types/crud";
import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { Sector } from "../entity/sector";
import { ISectorFilter, SectorWhereBuilder } from "../interface/sector";
import { SectorRepository } from "../repository/sector";

export abstract class SectorManager extends SectorRepository implements IRepositoryManager<Sector> {
    async exist(id: ID): Promise<boolean> {
        return await this.isExist(id);
    }

    async create(doc: any): Promise<Sector> {
        return await this.insert(doc);
    }

    async getOne(id: ID): Promise<Sector | null | undefined> {
        return await this.getById(id);
    }

    async getMany(id: ID[]): Promise<Sector[]> {
        const where: SectorWhereBuilder = (plotter) => plotter.whereIn("id", id);
        return await this.listAll(where);
    }

    async getList(filter?: any, reduce?: { limit: number; offset: number } | undefined): Promise<Sector[]> {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        return reduce ? await this.list(reduce.limit, reduce.offset, where) : await this.listAll(where);
    }

    async getCountedList(limit: number, offset: number, filter?: any, order?: ISorting | undefined): Promise<IPaginationResponse<Sector>> {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        const total = await this.count(where);
        const body = await this.list(limit, offset, where, order?.sortBy ? order : undefined);
        return { total, body };
    }

    async updateOne(id: ID, doc: Partial<Omit<Sector, "id" | "created">>): Promise<Sector | null | undefined> {
        return await this.updateById(id, doc);
    }

    async delete(id: ID | ID[]): Promise<void> {
        await this.deleteById(id);
    }

    private makeListingWhere(filter: ISectorFilter): SectorWhereBuilder {
        return (plotter) => {
            if (filter?.name) plotter.whereILike("name", `${filter.name}%`);
            if (filter?.areaFrom) plotter.where("area", ">=", filter.areaFrom);
            if (filter?.areaTo) plotter.where("area", "<=", filter.areaTo);
            return plotter;
        };
    }
}

class Manager extends SectorManager {}
export const SectorManagerInstance = new Manager();
