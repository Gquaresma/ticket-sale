import { OrderData } from "./order-data";
import { v4 as uuid } from "uuid";
import { Event } from "../event/event";
import { Quantity } from "../quantity";

export class Order {
  public readonly id: string;
  public readonly name: string;
  public readonly cpf: string;
  public readonly quantity: number;
  public readonly eventId: string

  private constructor(id: string, name: string, cpf: string, quantity: number, eventId: string) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.quantity = quantity;
    this.eventId = eventId;
  }

  static create(eventData: OrderData | Order): Order | Error {
    const quantityOrError: Quantity | Error = Quantity.create(eventData.quantity)

    if (quantityOrError instanceof Error) {
      return quantityOrError;
    }

    const id = eventData instanceof Event ? eventData.id : uuid();
    const name = eventData.name;
    const cpf = eventData.cpf;
    const quantity = (quantityOrError as Quantity).value;
    const eventId = eventData.eventId;

    return new Order(id, name, cpf, quantity, eventId);
  }
}
