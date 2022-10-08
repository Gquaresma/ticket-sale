import { OrderData } from "../../entites/order-data";

export interface OrderRepository {
  findAllOrders: () => OrderData[];
  findOrderByName: (name: string) => OrderData | null;
  existOrder: (name: string) => boolean;
  addOrder: (order: OrderData) => void;
  removeOrder: (id: string) => boolean;
}
