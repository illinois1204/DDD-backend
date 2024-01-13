import { Sensor } from "./sensor";

export class SensorData {
    constructor(
        readonly id: string | number,
        readonly moment: Date,
        readonly ppt: number,
        readonly dsn?: number,
        readonly npf?: boolean,
        public sensor?: string | number | Sensor
    ) {}

    static alias = "sensor-data";
}
