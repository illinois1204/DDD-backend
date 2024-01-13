import { Sector } from "./sector";

export class Sensor {
    constructor(
        readonly id: string | number,
        readonly model: string,
        public sector?: string | number | Sector
    ) {}

    static alias = "sensors";
}
