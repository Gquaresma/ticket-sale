import { Order } from "../../entites/order";

export interface OrderRepository {
  getAllOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
  exists: (name: string) => boolean;
  addOrder: (order: Order) => Order | undefined;
  removeOrder: (id: string) => Order | undefined;
  updateOrder: (order: Order) => Order | undefined;
}
