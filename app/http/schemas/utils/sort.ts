import Joi from "joi";
import { Order } from "../../../../internal/common/constants/ordering";

export function sortingSchema(sortByValues: string[]) {
    return {
        sortBy: Joi.string().valid(...sortByValues),
        orderBy: Joi.string()
            .valid(...Object.values(Order))
            .when("sortBy", {
                is: Joi.exist(),
                then: Joi.string()
                    .valid(...Object.values(Order))
                    .required()
            })
            .default("DESC")
    };
}
