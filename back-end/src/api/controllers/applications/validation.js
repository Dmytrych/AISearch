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

export const applicationUpdateSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    subtitle: Joi.string().max(100),
    description: Joi.string(),
    labels: Joi.array().items(Joi.string()).optional()
});

export const findApplicationsQuerySchema = Joi.object({
    name: Joi.string().optional(),
    labels: Joi.array().items(Joi.string()).optional()
});

export const findApplicationParamsSchema = Joi.object({
    applicationId: Joi.number().required(),
});

export const saveToLibraryParamsSchema = Joi.object({
    id: Joi.number().required(),
});

export const removeFromLibraryParamsSchema = Joi.object({
    applicationId: Joi.number().required(),
});

export const rateApplicationBodySchema = Joi.object({
    applicationId: Joi.number().required(),
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().optional(),
});

export const deleteApplicationParamsSchema = Joi.object({
    applicationId: Joi.number().required()
});

export const updateApplicationParamsSchema = Joi.object({
    applicationId: Joi.number().required()
});

export const getApplicationRatesParamsSchema = Joi.object({
    applicationId: Joi.number().required()
});

export const applicationViewParamsSchema = Joi.object({
    applicationId: Joi.number().required()
});

export const getMyApplicationRateParamsSchema = Joi.object({
    applicationId: Joi.number().required()
});