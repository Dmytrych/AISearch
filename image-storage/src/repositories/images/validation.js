import Joi from "joi";

export const imageCreateSchema = Joi.object({
    fileName: Joi.string().required(),
    originalFileName: Joi.string().required(),
    extension: Joi.string().required(),
    content: Joi.binary().required(),
    mimeType: Joi.string().required()
});