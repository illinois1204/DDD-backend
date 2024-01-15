import { FastifyInstance } from "fastify";
import { SensorController } from "../controllers/sensor";
import { sensorList } from "../schemas/sensor/list";

export const sensorProvider = async (app: FastifyInstance) => {
    app.post("", SensorController.new);
    app.get("", { schema: sensorList }, SensorController.list);
    app.get("/free", SensorController.listFree);
    app.get("/:id", SensorController.getOne);
    app.patch("/:id", SensorController.updateOne);
    app.delete("/:id", SensorController.deleteOne);
};
