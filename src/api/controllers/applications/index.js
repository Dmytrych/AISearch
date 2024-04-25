import express from "express";
import * as applicationsController from "./applications-controller.js"

const router = express.Router()

router.get('/', applicationsController.get);

export default router;