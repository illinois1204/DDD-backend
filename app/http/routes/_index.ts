import { FastifyInstance } from "fastify";
import { diagnosticLogProvider } from "./diagnostic-log";
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
    { instance: sensorDataProvider, prefix: "sensor/data" },
    { instance: diagnosticLogProvider, prefix: "diagnostic" }
];
