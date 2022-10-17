import { Event } from "../../../entites/event/event";
import { Order } from "../../../entites/order/order";
import { OrderData } from "../../../entites/order/order-data";
import { EventRepository } from "../../ports/event-repository";
import { OrderRepository } from "../../ports/order-repository";
import { CreateOrder } from "./create-order";

export class CreateOrderData implements CreateOrder {
  private readonly orderRepository: OrderRepository;
  private readonly eventRepository: EventRepository;

  constructor(
    orderRepository: OrderRepository,
    eventRepository: EventRepository
  ) {
    this.orderRepository = orderRepository;
    this.eventRepository = eventRepository;
  }

  createOrderData(orderData: OrderData): Order | Error {
    const orderOrError: Order | Error = Order.create(orderData);
    if (orderOrError instanceof Error) {
      return orderOrError;
    }
    const order: Order = orderOrError;

    const orderExists = this.orderRepository.exists(order.id);

    if (orderExists) {
      return new Error(`Order with id ${order.id} already exists.`);
    }

    const eventOfOrderExists = this.eventRepository.exists(order.eventId);

    if (!eventOfOrderExists) {
      return new Error(
        `Event of order with id ${order.eventId} does not exist.`
      );
    }

    const newOrder: Order = this.orderRepository.addOrder(order);

    const eventOfOrder: Event = this.eventRepository.getEventById(
      order.eventId
    ) as Event;

    const newTicketQuantity = eventOfOrder.ticketQuantity - newOrder.quantity;

    if (newTicketQuantity < 0) {
      return new Error(
        `Event ${eventOfOrder.name} has only ${eventOfOrder.ticketQuantity} tickets.`
      );
    }

    this.eventRepository.updateEvent({
      ...eventOfOrder,
      ticketQuantity: newTicketQuantity,
    });

    return newOrder;
  }
}
