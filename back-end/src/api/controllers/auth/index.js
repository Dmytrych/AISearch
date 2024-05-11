import express from "express";
import {validateBody} from "../../middleware/validation/index.js";
import * as authController from "./auth-controller.js";
import {authenticateSchema, registerUserSchema} from "./validation.js";

export function getAuthRouter() {
    const router = express.Router()

    router.post('/register', validateBody(registerUserSchema), authController.register);
    router.get('/login', validateBody(authenticateSchema), authController.authenticate)

    return router;
}