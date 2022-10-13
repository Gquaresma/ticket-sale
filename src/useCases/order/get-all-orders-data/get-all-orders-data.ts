import { Order } from "../../../entites/order";
import { OrderData } from "../../../entites/order-data";
import { OrderRepository } from "../../ports/order-repository";
import { GetAllOrders } from "./get-all-orders";

export class GetAllOrdersData implements GetAllOrders {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  getAllOrdersData(): OrderData[] | Error {
    const orders: Order[] = this.orderRepository.getAllOrders();
    return orders;
  }
}
