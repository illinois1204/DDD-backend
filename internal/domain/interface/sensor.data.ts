import { ID } from "../../common/types/id";
import { WhereBuilderFactory } from "../../common/types/sql";
import { SensorData } from "../entity/sensor.data";

export type SensorDataWhereBuilder = WhereBuilderFactory<SensorData>;

export interface ISensorDataCreate extends Omit<SensorData, "id" | "moment"> {
    sensor: ID;
}
