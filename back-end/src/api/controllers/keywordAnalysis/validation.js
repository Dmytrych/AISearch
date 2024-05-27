import Joi from "joi";

export const keywordAnalysisSchema = Joi.object({
    content: Joi.string().required(),
});