import { FastifyInstance } from "fastify";
import { DiagnosticLogController } from "../controllers/diagnostic-log";

export const diagnosticLogProvider = async (app: FastifyInstance) => {
    app.post("", DiagnosticLogController.new);
    app.get("/:id", DiagnosticLogController.getOne);
};
