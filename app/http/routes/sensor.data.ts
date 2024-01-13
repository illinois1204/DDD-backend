import { FastifyInstance } from "fastify";
import { SensorDataController } from "../controllers/sensor.data";

export const sensorDataProvider = async (app: FastifyInstance) => {
    app.get("", SensorDataController.list);
    app.get("/extend", SensorDataController.listExtended);
};
