import { FastifyInstance } from "fastify";
import { sectorProvider } from "./sector";
import { sensorProvider } from "./sensor";

interface IProvider {
    instance: (app: FastifyInstance) => Promise<void>;
    prefix: string;
}

export const Provider: Array<IProvider> = [
    { instance: sectorProvider, prefix: "sector" },
    { instance: sensorProvider, prefix: "sensor" }
];
