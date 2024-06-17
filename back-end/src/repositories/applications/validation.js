import Joi from "joi";

export const applicationCreateSchema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
        subtitle: Joi.string(),
        description: Joi.string(),
        imageId: Joi.number().integer().positive().optional(),
        imageName: Joi.string().optional(),
        rating: Joi.number().positive().optional(),
        views: Joi.number().positive().optional(),
        saves: Joi.number().positive().optional(),
        ratedCount: Joi.number().positive().optional()
    });