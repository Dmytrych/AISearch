import Joi from "joi";

export const applicationRateCreateSchema = Joi.object({
    applicationId: Joi.number().required(),
    ratedBy: Joi.number().required(),
    comment: Joi.string().optional(),
    rating: Joi.number().required()
});