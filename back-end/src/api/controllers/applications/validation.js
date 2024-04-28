import Joi from "joi";

const applicationSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    description: Joi.string().max(200),
    createdAt: Joi.date().timestamp('javascript').required(),
    updatedAt: Joi.date().timestamp('javascript').required(),
    rating: Joi.number().required()
});

export const applicationCreateSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    description: Joi.string().max(200),
    labels: Joi.array().items(Joi.string()).optional()
});