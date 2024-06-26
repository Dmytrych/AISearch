import Joi from "joi";
export const registerUserSchema = Joi.object({
    nickname: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    password: Joi.string().max(100),
    isAdmin: Joi.boolean().optional(),
});

export const updateUserSchema = Joi.object({
    nickname: Joi.string().required().max(100),
    email: Joi.string().email().required()
});

export const authenticateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100),
});