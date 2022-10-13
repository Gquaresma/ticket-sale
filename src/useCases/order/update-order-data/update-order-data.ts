import { Order } from "../../../entites/order/order";
import { OrderData } from "../../../entites/order/order-data";
import { EventRepository } from "../../ports/event-repository";
import { OrderRepository } from "../../ports/order-repository";
import { UpdateOrder } from "./update-order";

export class UpdateOrderData implements UpdateOrder {
  private readonly orderRepository: OrderRepository;
  private readonly eventRepository: EventRepository;

  constructor(
    orderRepository: OrderRepository,
    eventRepository: EventRepository
  ) {
    this.orderRepository = orderRepository;
    this.eventRepository = eventRepository;
  }

  updateOrderData(order: Order): OrderData | Error {
    const newOrderOrError: Order | Error = Order.create(order);
    if (newOrderOrError instanceof Error) {
      return newOrderOrError;
    }
    const newOrder: Order = newOrderOrError;

    const orderExists = this.orderRepository.exists(newOrder.id);

    if (!orderExists) {
      return new Error(`Order with id ${order.id} not found`);
    }

    const eventOfOrderExists = this.eventRepository.exists(newOrder.eventId);

    if (!eventOfOrderExists) {
      return new Error(
        `Event of order with id ${order.eventId} does not exist`
      );
    }

    const oldOrder = this.orderRepository.updateOrder(newOrder);
    return oldOrder;
  }
}
