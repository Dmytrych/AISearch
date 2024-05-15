import express from "express";
import {validateBody, validateQuery} from "../../middleware/validation/index.js";
import * as authController from "./auth-controller.js";
import {authenticateSchema, registerUserSchema, updateUserSchema} from "./validation.js";
import {authenticateToken} from "../../middleware/auth/index.js";

export function getAuthRouter() {
    const router = express.Router()

    router.post('/register', validateBody(registerUserSchema), authController.register);
    router.post('/login', validateBody(authenticateSchema), authController.authenticate);
    router.put('/profile', authenticateToken, validateBody(updateUserSchema), authController.updateProfile);
    router.get('/profile', authenticateToken, authController.getProfile);

    return router;
}