import { FastifyInstance } from "fastify";
import { wsController } from "../controllers/ws.demo";
import { UseSocketAuth } from "../middleware/auth";

export const wsDemoProvider = async (app: FastifyInstance) => {
    app.get("/notice", { preHandler: app.auth([UseSocketAuth]), websocket: true }, wsController.notice);
    app.get("/dialog", { websocket: true }, wsController.dialog);
};
