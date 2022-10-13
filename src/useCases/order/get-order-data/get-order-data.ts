
import { Order } from "../../../entites/order";
import { OrderRepository } from "../../ports/order-repository";
import { GetOrder } from "./get-order";

export class GetOrderData implements GetOrder {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  getOrderById(orderId: string): Order | Error {
    const order: Order | undefined = this.orderRepository.getOrderById(orderId);
    if ( !order ) {
      // TODO: make custom error for order not found (and for order event not found)
      return new Error(`Order with id ${orderId} not found.`)
    }
    return order;
  }
}
