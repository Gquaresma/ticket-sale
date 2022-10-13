import { MissingParamError } from "../errors/missing-param-error";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { GetOrder } from "../../../../useCases/order/get-order-data/get-order";
import { GetOrderResponse } from "../../../../useCases/order/get-order-data/get-order-response";

export class GetOrderController {
  private readonly getOrderData: GetOrder;

  constructor(getOrderData: GetOrder) {
    this.getOrderData = getOrderData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const orderId = requestData.data.id;
      if (!orderId) return new MissingParamError("id");

      const getOrderResponse: GetOrderResponse =
        this.getOrderData.getOrderById(orderId);

      if (getOrderResponse instanceof Error) {
        return badRequest(getOrderResponse);
      }
      return ok(getOrderResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
