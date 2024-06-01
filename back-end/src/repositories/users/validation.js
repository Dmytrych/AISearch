import Joi from "joi";

export const userCreateSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().required(),
    passwordHash: Joi.string().required(),
    isAdmin: Joi.boolean().optional()
});

export const userUpdateSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().required(),
});