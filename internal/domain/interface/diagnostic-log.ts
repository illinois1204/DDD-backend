import { DiagnosticLog } from "../entity/diagnostic-log";

export interface IDiagnosticLogCreate extends Omit<DiagnosticLog, "id" | "date"> {}
