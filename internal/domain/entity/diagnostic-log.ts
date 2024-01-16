import { ObjectId } from "mongodb";
import { Sector } from "./sector";

export type Inventory = {
    id: string | number | ObjectId;
    sector: string | number | Sector;
    working: boolean;
    comment?: string;
};

export class DiagnosticLog {
    constructor(
        readonly id: string | number,
        readonly date: Date,
        readonly employee: string,
        readonly inventory?: [Inventory]
    ) {}

    static alias = "diagnostic-log";
}
