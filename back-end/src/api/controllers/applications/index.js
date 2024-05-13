import express from "express";
import * as applicationsController from "./controller.js"
import {validateBody, validateUrlParams} from "../../middleware/validation/index.js";
import {
    applicationCreateSchema,
    findApplicationsQuerySchema,
    getApplicationRatesParamsSchema, getMyApplicationRateParamsSchema,
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
    router.post('/rate/', authenticateToken, validateBody(rateApplicationBodySchema), applicationsController.rateApplication)
    router.get('/rate/get/:applicationId', validateUrlParams(getApplicationRatesParamsSchema), applicationsController.getRatings)
    router.get('/rate/get-my/:applicationId', authenticateToken, validateUrlParams(getMyApplicationRateParamsSchema), applicationsController.getMyRating)

    return router;
}