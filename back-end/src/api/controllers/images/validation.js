import Joi from "joi";

export const imagesUrlParamsSchema = Joi.object({
    fileName: Joi.string().required(),
});