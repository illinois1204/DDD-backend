import { FastifyError, FastifyReply, FastifyRequest, errorCodes } from "fastify";
import { FastifyRouteSchemaDef } from "fastify/types/schema";
import { ObjectSchema, ValidationError } from "joi";
import { HttpStatus } from "./http-status";

export async function AppErrorPipe(ex: FastifyError, _: FastifyRequest, reply: FastifyReply) {
    if (ex.code == errorCodes.FST_ERR_VALIDATION().code && ex instanceof ValidationError) {
        const errors = ex.details.map(({ type, path: stack, message }) => ({ type, stack, message }));
        return reply.code(HttpStatus.UNPROCESSABLE_ENTITY).send({ errors });
    }

    console.error(ex.message);
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR);
    return { message: "Oops, something went wrong" };
}

export const AppValidator = (schema: FastifyRouteSchemaDef<ObjectSchema>) => (input: FastifyRouteSchemaDef<unknown>) => {
    return schema.schema.validate(input, { stripUnknown: true, abortEarly: false });
};
