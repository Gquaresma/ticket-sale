import { Order } from "../../../entites/order";
import { UpdateOrderResponse } from "./update-order-response";

export interface UpdateOrder {
  // TODO: checar erro e criar erro específico
  updateOrderData: (order: Order) => UpdateOrderResponse;
}
