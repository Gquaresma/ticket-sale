import { Order } from "../../../entites/order";
import { OrderData } from "../../../entites/order-data";
import { OrderRepository } from "../../ports/order-repository";
import { CreateOrder } from "./create-order";

export class CreateOrderData implements CreateOrder {
  private readonly orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  createOrderData(orderData: OrderData): OrderData | Error {
    const orderOrError: Order | Error = Order.create(orderData);
    if (orderOrError instanceof Error) {
      return orderOrError;
    }
    const order: Order = orderOrError;

    const newOrder: Order | undefined = this.orderRepository.addOrder(order);

    if (!newOrder) {
      return new Error(`Order with id ${order.id} already exists.`);
    }

    return newOrder;
  }
}
