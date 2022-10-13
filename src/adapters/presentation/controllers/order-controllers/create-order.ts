import { MissingParamError } from "../errors/missing-param-error";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { getKeys as getOrderDataKeys, OrderData} from "../../../../entites/order-data";
import { CreateOrder } from "../../../../useCases/order/create-order-data/create-order";
import { CreateOrderResponse } from "../../../../useCases/order/create-order-data/create-order-response";

function checkDataObjectFields(object: any): string | undefined {
  const props = getOrderDataKeys();
  const missingField = props.find((prop) => !object[prop]);
  return missingField;
}

export class CreateOrderController {
  private readonly createOrderData: CreateOrder;

  constructor(createOrderData: CreateOrder) {
    this.createOrderData = createOrderData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const missingField = checkDataObjectFields(requestData.data);
      if (missingField) return new MissingParamError(missingField);

      const orderData = requestData.data as OrderData;

      const createOrderResponse: CreateOrderResponse =
        this.createOrderData.createOrderData(orderData);

      if (createOrderResponse instanceof Error) {
        return badRequest(createOrderResponse);
      }
      return ok(createOrderResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
