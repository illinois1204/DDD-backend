import { FastifyInstance } from "fastify";
import { sensorDataController } from "../controllers/sensor.data";

export const sensorDataProvider = async (app: FastifyInstance) => {
    app.get("", sensorDataController.list);
    app.get("/extend", sensorDataController.listExtended);
};
