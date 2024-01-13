import { FastifySchema } from "fastify";
import Joi from "joi";
import { paginationSchema } from "../utils/pagination";
import { sortingSchema } from "../utils/sort";

const schema = Joi.object().keys({
    ...paginationSchema,
    name: Joi.string().trim(),
    areaFrom: Joi.number().min(0),
    areaTo: Joi.number().min(0),
    ...sortingSchema(["name", "area"])
});

export const sectorList: FastifySchema = { querystring: schema };
