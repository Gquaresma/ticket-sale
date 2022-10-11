import { Order } from "../../entites/order";
import { OrderData } from "../../entites/order-data";

export interface OrderRepository {
  getAllOrders: () => OrderData[];
  getOrderById: (id: string) => Order | undefined;
  exists: (name: string) => boolean;
  addOrder: (order: Order) => void;
  removeOrder: (id: string) => Order | undefined;
}
