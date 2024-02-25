import { FastifyInstance } from "fastify";
import { FWSController } from "../controllers/ws.demo";

export const wsDemoProvider = async (app: FastifyInstance) => {
    app.get("/notice", { /* preHandler: app.auth([UseAuth]), */ websocket: true }, FWSController.notice);
    app.get("/dialog", { websocket: true }, FWSController.dialog);
};
