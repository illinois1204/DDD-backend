import Joi from "joi";
import { REGEX } from "../../../../internal/common/constants/regex";

export const numberIdSchema = Joi.object().keys({ id: Joi.number().integer().positive().required() });
export const uuidIdSchema = Joi.object().keys({ id: Joi.string().uuid().required() });
export const objectIdSchema = Joi.object().keys({ id: Joi.string().regex(REGEX.objectId).required() });
