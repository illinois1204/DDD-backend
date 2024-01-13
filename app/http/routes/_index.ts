import { FastifyInstance } from "fastify";
import { sectorProvider } from "./sector";
import { sensorProvider } from "./sensor";
import { sensorDataProvider } from "./sensor.data";

interface IProvider {
    instance: (app: FastifyInstance) => Promise<void>;
    prefix: string;
}

export const Provider: Array<IProvider> = [
    { instance: sectorProvider, prefix: "sector" },
    { instance: sensorProvider, prefix: "sensor" },
    { instance: sensorDataProvider, prefix: "sensor/data" }
];
