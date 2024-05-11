import Joi from "joi";

export const applicationRateCreateSchema = Joi.object({
    applicationId: Joi.number().required(),
    ratedBy: Joi.number().required(),
    rating: Joi.number().required()
});