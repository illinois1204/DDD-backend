import { FastifyInstance } from "fastify";
import { sectorProvider } from "./sector";

interface IProvider {
    instance: (app: FastifyInstance) => Promise<void>;
    prefix: string;
}

export const Provider: Array<IProvider> = [{ instance: sectorProvider, prefix: "sector" }];
