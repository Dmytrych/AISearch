import {IRouterProvider} from "../utils/routes";
import express, {Router} from "express";
import {ApplicationController} from "../controllers/ApplicationController";
import {injectable} from "inversify";

@injectable()
class ApplicationsRouterProvider implements IRouterProvider {
  private readonly imagesController: ApplicationController;

  constructor(imagesController: ApplicationController) {
    this.imagesController = imagesController;
  }

  getRouter(): Router {
    const router = express.Router()

    router.put("/", this.imagesController.get.bind(this.imagesController))

    return router;
  }
}