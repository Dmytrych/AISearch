import IInversifyModule from "../utils/dependency-injection/InversifyModule";
import {Container} from "inversify";
import {ApplicationController} from "../controllers/ApplicationController";
import TYPES from "./types";

export class ControllersInversifyModule implements IInversifyModule {
  bind(container: Container) {
    container.bind<ApplicationController>(TYPES.ApplicationController).to(ApplicationController)
  }
}