import {Container} from "inversify";
import IInversifyModule from "../utils/dependency-injection/InversifyModule";
import {ControllersInversifyModule} from "./ControllersInversifyModule";

const modules: IInversifyModule[] = [
  new ControllersInversifyModule()
]

const mainContainer = new Container();

modules.map((module) => module.bind(mainContainer))

export default mainContainer