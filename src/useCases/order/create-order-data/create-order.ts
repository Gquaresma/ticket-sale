import { OrderData } from "../../../entites/order-data";
import { CreateOrderResponse } from "./create-order-response";

export interface CreateOrder {
  // TODO: checar erro e criar erro específico
  createOrderData: (order: OrderData) => CreateOrderResponse;
}
