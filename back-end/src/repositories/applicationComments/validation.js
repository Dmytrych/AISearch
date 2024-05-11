import Joi from "joi";

export const applicationCommentCreateSchema = Joi.object({
    applicationId: Joi.number().required(),
    createdBy: Joi.number().required(),
    content: Joi.string().required()
});