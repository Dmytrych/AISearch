import express from "express";
import {validateBody} from "../../middleware/validation/index.js";
import * as authController from "./auth-controller.js";
import {authenticateSchema, registerUserSchema, updateUserSchema} from "./validation.js";
import {getProfile, updateProfile} from "./auth-controller.js";
import {authenticateToken} from "../../middleware/auth/index.js";

export function getAuthRouter() {
    const router = express.Router()

    router.post('/register', validateBody(registerUserSchema), authController.register);
    router.get('/login', validateBody(authenticateSchema), authController.authenticate);
    router.put('/profile', authenticateToken, validateBody(updateUserSchema), authController.updateProfile);
    router.get('/profile', authenticateToken, authController.getProfile);

    return router;
}