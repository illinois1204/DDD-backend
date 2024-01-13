import { ID } from "./id";
import { ISorting } from "./sort-order";

export interface IBaseCRUD<T> {
    isExist(id: ID): Promise<boolean>;
    create(doc: Omit<T, "id">): Promise<T>;
    getById(id: ID): Promise<T | null | undefined>;
    count(where?: any): Promise<Number>;
    list(limit: number, offset: number, where?: any, order?: ISorting): Promise<T[]>;
    listAll(): Promise<T[]>;
    updateById(id: ID, doc: Partial<Omit<T, "id" | "created">>): Promise<T | null | undefined>;
    deleteById(id: ID): Promise<void>;
}