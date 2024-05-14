import express from "express";
import * as imagesController from "./controller.js"
import {validateUrlParams} from "../../middleware/validation/index.js";
import "express-async-errors"
import {imagesUrlParamsSchema} from "./validation.js";
import multer from "multer";

export function getImagesRouter() {
    const router = express.Router()
    const upload = multer()

    router.get('/:fileName', validateUrlParams(imagesUrlParamsSchema), imagesController.getByName);
    router.post('/', upload.single('image'), imagesController.addImage);

    return router;
}