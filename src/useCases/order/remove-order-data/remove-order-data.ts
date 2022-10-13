import { Order } from "../../../entites/order/order";
import { OrderRepository } from "../../ports/order-repository";
import { RemoveOrder } from "./remove-order";

export class RemoveOrderData implements RemoveOrder {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  removeOrderById(orderId: string): Order | Error {
    const orderExists = this.orderRepository.exists(orderId);

    if (!orderExists) {
      return new Error(`Order with id ${orderId} not found.`)
    }

    const order: Order  = this.orderRepository.removeOrder(orderId);
    return order;
  }
}
