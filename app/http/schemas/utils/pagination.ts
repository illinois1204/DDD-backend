import Joi from "joi";

export const paginationSchema = {
    limit: Joi.number().integer().min(0).max(1000).required(),
    offset: Joi.number().integer().min(0).required()
};
