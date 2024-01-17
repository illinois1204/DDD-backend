import { FastifyInstance } from "fastify";
import { DiagnosticLogController } from "../controllers/diagnostic-log";

export const diagnosticLogProvider = async (app: FastifyInstance) => {
    app.post("", DiagnosticLogController.new);
    app.get("", DiagnosticLogController.list);
    app.delete("", DiagnosticLogController.delete);
    app.get("/:id", DiagnosticLogController.getOne);
};
