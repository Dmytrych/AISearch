import express from "express";
import * as imagesController from "./controller.js"
import {validateUrlParams} from "../../middleware/validation/index.js";
import "express-async-errors"
import {imagesUrlParamsSchema} from "./validation.js";

export function getImagesRouter() {
    const router = express.Router()

    router.get('/:fileName', validateUrlParams(imagesUrlParamsSchema), imagesController.getByName);

    return router;
}