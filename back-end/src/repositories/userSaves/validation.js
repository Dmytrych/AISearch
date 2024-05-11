import Joi from "joi";

export const userSaveCreateSchema = Joi.object({
    applicationId: Joi.number().required(),
    savedBy: Joi.number().required()
});