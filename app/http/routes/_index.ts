import { FastifyInstance } from "fastify";
import { authDemoProvider } from "./auth.demo";
import { diagnosticLogProvider } from "./diagnostic-log";
import { sectorProvider } from "./sector";
import { sensorProvider } from "./sensor";
import { sensorDataProvider } from "./sensor.data";
import { wsDemoProvider } from "./ws.demo";

interface IProvider {
    instance: (app: FastifyInstance) => Promise<void>;
    prefix: string;
}

export const HttpProvider: Array<IProvider> = [
    { instance: sectorProvider, prefix: "sector" },
    { instance: sensorProvider, prefix: "sensor" },
    { instance: sensorDataProvider, prefix: "sensor/data" },
    { instance: diagnosticLogProvider, prefix: "diagnostic" },
    { instance: authDemoProvider, prefix: "auth" },
    { instance: wsDemoProvider, prefix: "ws" }
];
