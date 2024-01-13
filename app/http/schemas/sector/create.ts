import { FastifySchema } from "fastify";
import Joi from "joi";

const schema = Joi.object().keys({
    name: Joi.string().trim().required(),
    area: Joi.number().positive().required()
});

export const sectorCreate: FastifySchema = { body: schema };
