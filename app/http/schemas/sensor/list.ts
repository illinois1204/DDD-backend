import { FastifySchema } from "fastify";
import Joi from "joi";
import { paginationSchema } from "../utils/pagination";

const schema = Joi.object().keys({
    ...paginationSchema,
    sector: Joi.array().items(Joi.number().integer().min(1)).single().unique()
});

export const sensorList: FastifySchema = { querystring: schema };
