import { WithId, WithoutId } from "mongodb";
import { IPrimaryKey } from "../../common/types/id";

export abstract class NoSQLMapper {
    static toEntity<T extends IPrimaryKey>(model: WithId<T>): WithoutId<WithId<T>> {
        const { _id, ...rest } = model;
        rest.id = _id.toString();
        return rest;
    }

    static toArrayEntity<T extends IPrimaryKey>(model: WithId<T>[]): WithoutId<WithId<T>>[] {
        return model.map((i) => {
            const { _id, ...rest } = i;
            rest.id = _id.toString();
            return rest;
        });
    }
}
