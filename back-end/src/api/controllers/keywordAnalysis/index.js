import express from "express";
import {validateBody} from "../../middleware/validation/index.js";
import * as keywordsController from "./controller.js";
import {keywordAnalysisSchema} from "./validation.js";

export function getKeywordAnalysisRouter() {
  const router = express.Router()

  router.post('/analyze', validateBody(keywordAnalysisSchema), keywordsController.getKeywords);

  return router;
}