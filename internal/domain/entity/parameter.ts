import { Sensor } from "./sensor";

export class SensorParameter {
    constructor(
        readonly id: string | number,
        readonly moment: Date,
        readonly ppt: number,
        readonly dsn?: number,
        readonly npf?: boolean,
        readonly sensor?: string | number | Sensor
    ) {}

    static alias = "sensor-data";
}
