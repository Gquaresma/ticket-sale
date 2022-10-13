import { RemoveOrderResponse } from "./remove-order-response";

export interface RemoveOrder {
  removeOrderById: (orderId: string) => RemoveOrderResponse;
}
