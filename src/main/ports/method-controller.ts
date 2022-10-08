import { Request } from "../../adapters/presentation/controllers/ports/request";
import { Response } from "../../adapters/presentation/controllers/ports/response";

export interface MethodController {
  handle: (requestData: Request) => Response | Error;
}

export interface MethodControllers {
  [key: string]: MethodController;
}
