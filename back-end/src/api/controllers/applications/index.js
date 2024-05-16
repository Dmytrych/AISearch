import express from "express";
import * as applicationsController from "./controller.js"
import {validateBody, validateUrlParams} from "../../middleware/validation/index.js";
import {
    applicationCreateSchema,
    applicationUpdateSchema,
    applicationViewParamsSchema,
    deleteApplicationParamsSchema,
    findApplicationParamsSchema,
    findApplicationsQuerySchema,
    getApplicationRatesParamsSchema,
    getMyApplicationRateParamsSchema,
    rateApplicationBodySchema,
    removeFromLibraryParamsSchema,
    saveToLibraryParamsSchema,
    updateApplicationParamsSchema
} from "./validation.js";
import {validateQuery} from "../../middleware/validation/index.js";
import "express-async-errors"
import multer from "multer";
import {authenticateToken} from "../../middleware/auth/index.js";
import {getAttachmentMiddleware} from "../../middleware/file-upload/index.js";

export function getApplicationsRouter(config) {
    const router = express.Router()
    const upload = multer()

    router.post('/register-view/:applicationId', validateUrlParams(applicationViewParamsSchema), applicationsController.registerView);
    router.get('/', validateQuery(findApplicationsQuerySchema), applicationsController.get);
    router.get('/:applicationId', validateUrlParams(findApplicationParamsSchema), applicationsController.getById);
    router.post('/', authenticateToken, upload.single('image'), getAttachmentMiddleware(config.IMAGE_STORAGE_URL), validateBody(applicationCreateSchema), applicationsController.create)
    router.delete('/:applicationId', authenticateToken, validateUrlParams(deleteApplicationParamsSchema), applicationsController.deleteApplication)
    router.put('/:applicationId',
        authenticateToken,
        upload.single('image'),
        getAttachmentMiddleware(config.IMAGE_STORAGE_URL),
        validateUrlParams(updateApplicationParamsSchema),
        validateBody(applicationUpdateSchema),
        applicationsController.update)
    router.post('/library/save/:id', authenticateToken, validateUrlParams(saveToLibraryParamsSchema), applicationsController.saveToLibrary)
    router.get('/library/', authenticateToken, applicationsController.getLibrary)
    router.delete('/library/:applicationId', authenticateToken, validateUrlParams(removeFromLibraryParamsSchema), applicationsController.removeFromLibrary)
    router.post('/rate/', authenticateToken, validateBody(rateApplicationBodySchema), applicationsController.rateApplication)
    router.get('/rate/get/:applicationId', validateUrlParams(getApplicationRatesParamsSchema), applicationsController.getRatings)
    router.get('/rate/get-my/:applicationId', authenticateToken, validateUrlParams(getMyApplicationRateParamsSchema), applicationsController.getMyRating)

    return router;
}