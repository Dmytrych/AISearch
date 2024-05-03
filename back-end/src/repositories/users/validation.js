import Joi from "joi";

export const userCreateSchema = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().required(),
    passwordHash: Joi.string().required()
});

export const userRoleCreateSchema = Joi.object({
    userId: Joi.number().required(),
    roleId: Joi.number().required(),
});