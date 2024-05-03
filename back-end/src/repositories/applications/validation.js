import Joi from "joi";

export const applicationCreateSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    subtitle: Joi.string().max(100),
    description: Joi.string().max(300),
    imageId: Joi.number().integer().positive().optional(),
    imageName: Joi.string().optional(),
});