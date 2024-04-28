import Joi from "joi";

export const labelCreateSchema = Joi.object({
    applicationId: Joi.number().required(),
    name: Joi.string().required()
});