import express from "express";
import * as applicationsController from "./controller.js"
import {validateBody} from "../../middleware/validation/index.js";
import {applicationCreateSchema, findApplicationsQuerySchema} from "./validation.js";
import {validateQuery} from "../../middleware/validation/query-validation.js";
import "express-async-errors"
import multer from "multer";

export function getApplicationsRouter() {
    const router = express.Router()
    const upload = multer()

    router.get('/', validateQuery(findApplicationsQuerySchema), applicationsController.get);
    router.post('/', upload.single('image'), validateBody(applicationCreateSchema), applicationsController.create)

    return router;
}