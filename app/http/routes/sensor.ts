import { FastifyInstance } from "fastify";
import { sensorController } from "../controllers/sensor";
import { sensorList } from "../schemas/sensor/list";

export const sensorProvider = async (app: FastifyInstance) => {
    app.post("", sensorController.new);
    app.get("", { schema: sensorList }, sensorController.list);
    app.get("/free", sensorController.listFree);
    app.get("/:id", sensorController.getOne);
    app.patch("/:id", sensorController.updateOne);
    app.delete("/:id", sensorController.deleteOne);
};
