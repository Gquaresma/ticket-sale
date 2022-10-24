import { badRequest } from "../../adapters/presentation/controllers/helpers/response-helper";
import { SYNC_DATA_METHOD } from "../../middleware/src/config";
import Service from "../../middleware/src/service";
import { adaptRoute } from "../adapters/adapter";
import { getController } from "../helpers/choose-controller";
import { dataSync } from "../helpers/data-sync";
import { Controller } from "../ports/method-controller";
import { RouteRequest } from "../ports/route-request";

export default (service: Service) => {
  service.setOnData((requestObject: Object) => {
    const request: RouteRequest = requestObject as RouteRequest;
    const { method, path } = request;

    if (method === SYNC_DATA_METHOD) {
      return dataSync(request);
    }

    const controllerOrError = getController(path, method);
    if (controllerOrError instanceof Error) {
      return badRequest(controllerOrError);
    }
    const routeController: Controller = controllerOrError;
    const responseHandler = adaptRoute(routeController);
    return responseHandler(request);
  });
};
