import { Event } from "../../../entites/event";
import { Order } from "../../../entites/order";
import { OrderData } from "../../../entites/order-data";
import { EventRepository } from "../../ports/event-repository";
import { OrderRepository } from "../../ports/order-repository";
import { CreateOrder } from "./create-order";

export class CreateOrderData implements CreateOrder {
  private readonly orderRepository: OrderRepository;
  private readonly eventRepository: EventRepository;

  constructor(orderRepository: OrderRepository, eventRepository: EventRepository) {
    this.orderRepository = orderRepository;
    this.eventRepository = eventRepository;
  }

  createOrderData(orderData: OrderData): Order | Error {
    const orderOrError: Order | Error = Order.create(orderData);
    if (orderOrError instanceof Error) {
      return orderOrError;
    }
    const order: Order = orderOrError;

    const newOrder: Order | undefined = this.orderRepository.addOrder(order);

    if (!newOrder) {
      return new Error(`Order with id ${order.id} already exists.`);
    }

    const eventOfOrder: Event = this.eventRepository.getEventById(order.eventId) as Event;

    const newTicketQuantity = eventOfOrder.ticketQuantity - newOrder.quantity;

    if ( newTicketQuantity < 0 ) {
      return new Error(`Event ${eventOfOrder.name} has only ${eventOfOrder.ticketQuantity} tickets.`);
    }

    this.eventRepository.updateEvent({
      ...eventOfOrder,
      ticketQuantity: newTicketQuantity
    })

    return newOrder;
  }
}
