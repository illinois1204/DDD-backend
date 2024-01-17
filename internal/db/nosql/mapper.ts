import { WithId, WithoutId } from "mongodb";

export abstract class NoSQLMapper {
    static toEntity<T extends { id: string | number }>(model: WithId<T>): WithoutId<WithId<T>> {
        const { _id, ...rest } = model;
        rest.id = _id.toString();
        return rest;
    }
}
