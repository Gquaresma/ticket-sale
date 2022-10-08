import { OrderData } from "./order-data";
import { Event } from "./event";
import { v4 as uuid } from "uuid";

export class Order {
  public readonly id: string;
  public readonly name: string;
  public readonly cpf: string;
  public readonly quantity: String;
  public readonly eventId: string

  private constructor(name: string, cpf: string, quantity: string, event: Event) {
    this.id = uuid();
    this.name = name;
    this.cpf = cpf;
    this.quantity = quantity;
    this.eventId = event.id
  }

}
