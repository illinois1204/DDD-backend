import { ID } from "../../common/types/id";
import { IPaginationResponse } from "../../common/types/pagination";
import { ISorting } from "../../common/types/sort-order";
import { ISectorCreate, ISectorFilter, ISectorUpdate, SectorWhereBuilder } from "../interface/sector";
import { SectorRepository } from "../repository/sector";

export class SectorService {
    private readonly repository: SectorRepository;
    constructor() {
        this.repository = new SectorRepository();
    }

    async exist(id: ID) {
        return await this.repository.isExist(id);
    }

    async new(doc: ISectorCreate) {
        return await this.repository.create(doc);
    }

    async getOne(id: ID) {
        return await this.repository.getById(id);
    }

    async getList(limit: number, offset: number, filter?: ISectorFilter) {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        return await this.repository.list(limit, offset, where);
    }

    async getCountedList(limit: number, offset: number, filter?: ISectorFilter, order?: ISorting): Promise<IPaginationResponse> {
        const where = filter ? this.makeListingWhere(filter) : undefined;
        const total = await this.repository.count(where);
        const body = await this.repository.list(limit, offset, where, order?.sortBy ? order : undefined);
        return { total, body };
    }

    async updateOne(id: ID, doc: ISectorUpdate) {
        return await this.repository.updateById(id, doc);
    }

    async delete(id: ID | ID[]) {
        await this.repository.deleteById(id);
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
