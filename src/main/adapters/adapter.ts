import { Request } from "../../adapters/presentation/controllers/ports/request";
import { Controller } from "../ports/method-controller";
import { RouteRequest } from "../ports/route-request";

export const adaptRoute = (controller: Controller) => {
  return (request: RouteRequest) => {
    const requestData: Request = {
      data: request?.data,
    };
    const response = controller.handle(requestData);
    return response;
  };
};
