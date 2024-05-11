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
    subtitle: Joi.string().max(100),
    description: Joi.string().max(300),
    labels: Joi.array().items(Joi.string()).optional()
});

export const findApplicationsQuerySchema = Joi.object({
    name: Joi.string().optional(),
    labels: Joi.array().items(Joi.string()).optional()
});

export const saveToLibraryParamsSchema = Joi.object({
    id: Joi.number().required(),
});

export const rateApplicationBodySchema = Joi.object({
    applicationId: Joi.number().required(),
    number: Joi.number().min(0).max(5).required(),
});