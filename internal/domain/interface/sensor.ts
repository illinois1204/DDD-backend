import { ID } from "../../common/types/id";
import { WhereBuilderFactory } from "../../common/types/sql";
import { Sensor } from "../entity/sensor";

export type SensorWhereBuilder = WhereBuilderFactory<Sensor>;

export interface ISensorCreate extends Omit<Sensor, "id"> {
    sector: ID;
}

export interface ISensorUpdate extends Partial<Omit<Sensor, "id" | "created">> {}
