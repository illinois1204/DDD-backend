import { FastifySchema } from "fastify";
import Joi from "joi";
import { numberIdSchema } from "../utils/primary-key";

const body = Joi.object().keys({
    name: Joi.string().trim(),
    area: Joi.number().positive()
});

export const sectorUpdate: FastifySchema = { body, params: numberIdSchema };
