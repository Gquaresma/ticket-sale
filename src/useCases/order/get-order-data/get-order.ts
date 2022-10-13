import { GetOrderResponse } from "./get-order-response";

export interface GetOrder {
  getOrderById: (orderId: string) => GetOrderResponse;
}
