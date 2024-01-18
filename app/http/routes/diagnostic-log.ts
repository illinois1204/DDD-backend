import { FastifyInstance } from "fastify";
import { DiagnosticLogController } from "../controllers/diagnostic-log";

export const diagnosticLogProvider = async (app: FastifyInstance) => {
    app.post("", DiagnosticLogController.new);
    app.get("", DiagnosticLogController.list);
    app.delete("", DiagnosticLogController.delete);
    app.patch("/inventory", DiagnosticLogController.updateInventory);
    app.post("/inventory/:id", DiagnosticLogController.addInventory);
    app.delete("/inventory/:id", DiagnosticLogController.deleteInventory);
    app.get("/:id", DiagnosticLogController.getOne);
};
