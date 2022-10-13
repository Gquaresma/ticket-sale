import { Order } from "../../entites/order/order";

export interface OrderRepository {
  getAllOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
  exists: (name: string) => boolean;
  addOrder: (order: Order) => Order;
  removeOrder: (id: string) => Order;
  updateOrder: (order: Order) => Order;
}
