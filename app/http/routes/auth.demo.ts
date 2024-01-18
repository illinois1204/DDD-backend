import { FastifyInstance } from "fastify";
import { authDemoController } from "../controllers/auth.demo";
import { UseAuth } from "../middleware/auth";

export const authDemoProvider = async (app: FastifyInstance) => {
    app.post("/login", authDemoController.login);
    app.get("/hello", { preHandler: app.auth([UseAuth]) }, authDemoController.hello);
};
