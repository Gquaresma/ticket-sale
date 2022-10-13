import { GetAllOrdersResponse } from "./get-all-orders-response";

export interface GetAllOrders {
  getAllOrdersData: () => GetAllOrdersResponse;
}
