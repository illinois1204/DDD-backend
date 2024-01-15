import { ID } from "./id";
import { IPaginationResponse } from "./pagination";
import { ISorting } from "./sort-order";

export interface IBaseCRUD<T> {
    isExist(id: ID): Promise<boolean>;
    create(doc: Omit<T, "id">): Promise<T>;
    getById(id: ID): Promise<T | null | undefined>;
    getByKey<K extends keyof T>(key: K, value: string | number | boolean): Promise<T[]>;
    count(where?: any): Promise<Number>;
    list(limit: number, offset: number, where?: any, order?: ISorting): Promise<T[]>;
    listAll(where?: any): Promise<T[]>;
    updateById(id: ID, doc: Partial<Omit<T, "id" | "created">>): Promise<T | null | undefined>;
    deleteById(id: ID | ID[]): Promise<void>;
}

export interface IRepositoryManager<T> {
    exist(id: ID): Promise<boolean>;
    new (doc: Omit<T, "id">): Promise<T>;
    getOne(id: ID): Promise<T | null | undefined>;
    getMany(id: ID[]): Promise<T[]>;
    getList(filter?: any, reduce?: { limit: number; offset: number }): Promise<T[]>;
    getCountedList(limit: number, offset: number, filter?: any, order?: ISorting): Promise<IPaginationResponse>;
    updateOne(id: ID, doc: Partial<Omit<T, "id" | "created">>): Promise<T | null | undefined>;
    delete(id: ID | ID[]): Promise<void>;
}
