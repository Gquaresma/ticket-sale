import { MissingParamError } from "../errors/missing-param-error";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { RemoveOrderResponse } from "../../../../useCases/order/remove-order-data/remove-order-response";
import { RemoveOrder } from "../../../../useCases/order/remove-order-data/remove-order";

export class RemoveOrderController {
  private readonly removeOrderData: RemoveOrder;

  constructor(removeOrderData: RemoveOrder) {
    this.removeOrderData = removeOrderData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const orderId = requestData.data.id;
      if (!orderId) return new MissingParamError("id");

      const removeOrderResponse: RemoveOrderResponse =
        this.removeOrderData.removeOrderById(orderId);

      if (removeOrderResponse instanceof Error) {
        return badRequest(removeOrderResponse);
      }
      return ok(removeOrderResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
