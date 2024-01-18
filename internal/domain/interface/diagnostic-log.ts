import { DiagnosticLog, Inventory } from "../entity/diagnostic-log";

export interface IDiagnosticLogCreate extends Omit<DiagnosticLog, "id" | "date"> {}

export interface IDiagnosticLogInventoryCreate extends Omit<Inventory, "id"> {}

export interface IDiagnosticLogInventoryUpdate extends Partial<Omit<Inventory, "id">> {}

export interface IDiagnosticLogFilter {
    dateFrom?: Date;
    dateTo?: Date;
}
