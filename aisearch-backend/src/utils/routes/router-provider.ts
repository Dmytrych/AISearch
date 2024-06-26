import {Router} from "express";

export interface IRouterProvider {
  getRouter(): Router;
}