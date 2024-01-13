import { FastifyInstance } from "fastify";
import { SectorController } from "../controllers/sector";
import { sectorCreate } from "../schemas/sector/create";
import { sectorList } from "../schemas/sector/list";
import { sectorUpdate } from "../schemas/sector/update";
import { numberIdSchema } from "../schemas/utils/primary-key";

export const sectorProvider = async (app: FastifyInstance) => {
    app.post("", { schema: sectorCreate }, SectorController.create);
    app.get("", { schema: sectorList }, SectorController.list);
    app.get("/:id", { schema: { params: numberIdSchema } }, SectorController.getOne);
    app.patch("/:id", { schema: sectorUpdate }, SectorController.updateOne);
    app.delete("/:id", { schema: { params: numberIdSchema } }, SectorController.deleteOne);
};
