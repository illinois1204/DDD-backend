import { FastifyInstance } from "fastify";
import { diagnosticLogController } from "../controllers/diagnostic-log";

export const diagnosticLogProvider = async (app: FastifyInstance) => {
    app.post("", diagnosticLogController.new);
    app.get("", diagnosticLogController.list);
    app.delete("", diagnosticLogController.delete);
    app.patch("/inventory", diagnosticLogController.updateInventory);
    app.post("/inventory/:id", diagnosticLogController.addInventory);
    app.delete("/inventory/:id", diagnosticLogController.deleteInventory);
    app.get("/:id", diagnosticLogController.getOne);
};
