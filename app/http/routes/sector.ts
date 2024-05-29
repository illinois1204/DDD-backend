import { FastifyInstance } from "fastify";
import { sectorController } from "../controllers/sector";
import { sectorCreate } from "../schemas/sector/create";
import { sectorList } from "../schemas/sector/list";
import { sectorUpdate } from "../schemas/sector/update";
import { numberIdSchema } from "../schemas/utils/primary-key";

export const sectorProvider = async (app: FastifyInstance) => {
    app.post("", { schema: sectorCreate }, sectorController.new);
    app.get("", { schema: sectorList }, sectorController.list);
    app.get("/:id", { schema: { params: numberIdSchema } }, sectorController.getOne);
    app.patch("/:id", { schema: sectorUpdate }, sectorController.updateOne);
    app.delete("/:id", { schema: { params: numberIdSchema } }, sectorController.deleteOne);
};
