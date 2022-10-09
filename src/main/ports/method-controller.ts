import { Request } from "../../adapters/presentation/controllers/ports/request";
import { Response } from "../../adapters/presentation/controllers/ports/response";

export interface Controller {
  handle: (requestData: Request) => Response | Error;
}

type ControllerFactory  = () => Controller

export interface ControllerFactories {
  [key: string]: ControllerFactory;
}
