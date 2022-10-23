import { Event } from "../../../entites/event/event";
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

    const orderToUpdate = this.orderRepository.getOrderById(newOrder.id);

    if (!orderToUpdate) {
      return new Error(`Order with id ${order.id} not found`);
    }

    const eventOfOrder: Event = this.eventRepository.getEventById(
      order.eventId
    ) as Event;

    if (!eventOfOrder) {
      return new Error(
        `Event of order with id ${order.eventId} does not exist`
      );
    }

    const availableQuantity =
      eventOfOrder.ticketQuantity + orderToUpdate.quantity;
    const newTicketQuantity = availableQuantity - order.quantity;

    if (newTicketQuantity < 0) {
      return new Error(
        `Event ${eventOfOrder.name} has only ${availableQuantity} ticket(s).`
      );
    }

    const oldOrder = this.orderRepository.updateOrder(newOrder);
    return oldOrder;
  }
}
