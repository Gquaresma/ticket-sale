import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { GetAllOrders } from "../../../../useCases/order/get-all-orders-data/get-all-orders";
import { GetAllOrdersResponse } from "../../../../useCases/order/get-all-orders-data/get-all-orders-response";

export class GetAllOrdersController {
  private readonly getAllOrdersData: GetAllOrders;

  constructor(getAllOrdersData: GetAllOrders) {
    this.getAllOrdersData = getAllOrdersData;
  }

  handle(): Response | Error {
    try {
      const getAllOrdersResponse: GetAllOrdersResponse =
        this.getAllOrdersData.getAllOrdersData();

      if (getAllOrdersResponse instanceof Error) {
        return badRequest(getAllOrdersResponse);
      }

      return ok(getAllOrdersResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
