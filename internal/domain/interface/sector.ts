import { WhereBuilderFactory } from "../../common/types/sql";
import { Sector } from "../entity/sector";

export type SectorWhereBuilder = WhereBuilderFactory<Sector>;

export interface ISectorCreate extends Omit<Sector, "id"> {}

export interface ISectorUpdate extends Partial<Omit<Sector, "id">> {}

export interface ISectorFilter extends Pick<Partial<Sector>, "name"> {
    areaFrom?: number;
    areaTo?: number;
}
