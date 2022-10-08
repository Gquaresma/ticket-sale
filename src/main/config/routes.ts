import { badRequest } from "../../adapters/presentation/controllers/helpers/response-helper";
import { adaptRoute } from "../adapters/adapter";
import { getController } from "../helpers/choose-controller";
import { MethodController } from "../ports/method-controller";
import { RouteRequest } from "../ports/route-request";
import { OnDataFunction } from "../types/onDataFunction";

export default (onData: OnDataFunction) => {
  onData((request: RouteRequest) => {
    const { method, path } = request;

    const controllerOrError = getController(path, method);
    if (controllerOrError instanceof Error) {
      return badRequest(controllerOrError);
    }
    const routeController: MethodController = controllerOrError;
    const responseHandler = adaptRoute(routeController);
    return responseHandler(request);
  });
};

