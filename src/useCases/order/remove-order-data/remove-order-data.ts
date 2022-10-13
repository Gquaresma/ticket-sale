import { Order } from "../../../entites/order/order";
import { OrderRepository } from "../../ports/order-repository";
import { RemoveOrder } from "./remove-order";

export class RemoveOrderData implements RemoveOrder {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  removeOrderById(orderId: string): Order | Error {
    const order: Order | undefined = this.orderRepository.removeOrder(orderId);
    if ( !order ) {
      // TODO: make custom error for order not found
      return new Error(`Order with id ${orderId} not found.`)
    }
    return order;
  }
}
