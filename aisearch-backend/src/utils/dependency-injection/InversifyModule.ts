import {Container} from "inversify";

export default interface IInversifyModule {
  bind(container: Container);
}