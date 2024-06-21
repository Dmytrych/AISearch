import {controller, httpGet, request, response} from "inversify-express-utils";

@controller("/applications")
export class ApplicationController {

  @httpGet("/")
  get(@request() req: Request, @response() res: Response) {
    throw new Error("Not implemented")
  }
}