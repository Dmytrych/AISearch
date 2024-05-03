import express from "express";
import {validateBody} from "../../middleware/validation/index.js";
import * as authController from "./auth-controller.js";
import {authenticateSchema, registerUserSchema} from "./validation.js";

export function getAuthRouter() {
    const router = express.Router()

    router.post('/', validateBody(registerUserSchema), authController.register);
    router.get('/', validateBody(authenticateSchema), authController.authenticate)

    return router;
}