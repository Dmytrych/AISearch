import Joi from "joi";

export const applicationCreateSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    description: Joi.string().max(200),
});