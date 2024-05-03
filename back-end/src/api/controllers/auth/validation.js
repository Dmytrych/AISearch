import Joi from "joi";
export const registerUserSchema = Joi.object({
    nickname: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    password: Joi.string().max(100),
});

export const authenticateSchema = Joi.object({
    name: Joi.string().optional(),
    labels: Joi.array().items(Joi.string()).optional()
});