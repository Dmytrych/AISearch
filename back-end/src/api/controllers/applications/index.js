import express from "express";
import * as applicationsController from "./controller.js"
import {validateBody} from "../../middleware/validation/index.js";
import {applicationCreateSchema, findApplicationsQuerySchema} from "./validation.js";
import {validateQuery} from "../../middleware/validation/index.js";
import "express-async-errors"
import multer from "multer";
import {authenticateToken} from "../../middleware/auth/index.js";

export function getApplicationsRouter() {
    const router = express.Router()
    const upload = multer()

    router.get('/', validateQuery(findApplicationsQuerySchema), authenticateToken, applicationsController.get);
    router.post('/', upload.single('image'), validateBody(applicationCreateSchema), applicationsController.create)

    return router;
}