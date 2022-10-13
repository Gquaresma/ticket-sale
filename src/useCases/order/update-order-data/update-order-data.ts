import { Order } from "../../../entites/order";
import { OrderData } from "../../../entites/order-data";
import { OrderRepository } from "../../ports/order-repository";
import { UpdateOrder } from "./update-order";

export class UpdateOrderData implements UpdateOrder {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  updateOrderData(order: Order): OrderData | Error {
    const newOrderOrError: Order | Error = Order.create(order);
    if (newOrderOrError instanceof Error) {
      return newOrderOrError;
    }
    const newOrder: Order = newOrderOrError;

    const oldOrder = this.orderRepository.updateOrder(order);
    if ( !oldOrder ) {
      // TODO: make custom error
      return new Error(`Order with id ${order.id} not found`);
    }
    return oldOrder;
  }
}
