import { Request } from "../../adapters/presentation/controllers/ports/request";
import { MethodController } from "../ports/method-controller";
import { RouteRequest } from "../ports/route-request";

export const adaptRoute = (controller: MethodController) => {
  return (request: RouteRequest) => {
    const requestData: Request = {
      data: request?.data,
    };
    const response = controller.handle(requestData);
    return response;
  };
};
