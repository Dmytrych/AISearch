import express from "express";
import * as applicationsController from "./controller.js"
import {validateBody, validateUrlParams} from "../../middleware/validation/index.js";
import {
    applicationCreateSchema,
    findApplicationsQuerySchema,
    rateApplicationBodySchema,
    saveToLibraryParamsSchema
} from "./validation.js";
import {validateQuery} from "../../middleware/validation/index.js";
import "express-async-errors"
import multer from "multer";
import {authenticateToken} from "../../middleware/auth/index.js";

export function getApplicationsRouter() {
    const router = express.Router()
    const upload = multer()

    router.get('/', validateQuery(findApplicationsQuerySchema), applicationsController.get);
    router.post('/', authenticateToken, upload.single('image'), validateBody(applicationCreateSchema), applicationsController.create)
    router.post('/library/save/:id', authenticateToken, validateUrlParams(saveToLibraryParamsSchema), applicationsController.saveToLibrary)
    router.get('/library/', authenticateToken, applicationsController.getLibrary)
    router.post('/rate/', authenticateToken, validateUrlParams(rateApplicationBodySchema), applicationsController.getLibrary)

    return router;
}