import express from "express";
import * as applicationsController from "./applications-controller.js"
import {validateBody} from "../../middleware/validation/index.js";
import {applicationCreateSchema} from "./validation.js";

export function getApplicationsRouter() {
    const router = express.Router()

    router.get('/', applicationsController.get);
    router.post('/', validateBody(applicationCreateSchema), applicationsController.create)

    return router;
}