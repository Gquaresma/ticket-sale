import { v4 as uuid } from "uuid";
import { InvalidQuantityError } from "../errors/invalid-quantity-error";
import { Quantity } from "../quantity";
import { EventData } from "./event-data";

export class Event {
  public readonly id: string;
  public readonly name: string;
  public readonly type: string;
  public readonly local: string;
  public readonly ticketPrice: number;
  public readonly ticketQuantity: number;
  public readonly date: string;

  private constructor(
    id: string,
    name: string,
    type: string,
    local: string,
    ticketPrice: number,
    ticketQuantity: number,
    date: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.local = local;
    this.ticketPrice = ticketPrice;
    this.ticketQuantity = ticketQuantity;
    this.date = date;
  }

  static create(eventData: EventData | Event): Event | Error {
    // TODO: create errors like these: (if required)

    // const nameOrError: Either<InvalidNameError, Name> = Name.create(userData.name)

    // TODO: validação de todos os atributos

    // if (nameOrError.isLeft()) {
    //   return left(nameOrError.value)
    // }
    // if (emailOrError.isLeft()) {
    //   return left(emailOrError.value)
    // }

    // const name: Name = nameOrError.value
    // const email: Email = emailOrError.value

    const quantityOrError: Quantity | Error = Quantity.create(
      eventData.ticketQuantity
    );

    if (quantityOrError instanceof Error) {
      return new InvalidQuantityError(eventData.ticketQuantity);
    }

    const id = eventData instanceof Event ? eventData.id : uuid();
    const name = eventData.name;
    const type = eventData.type;
    const local = eventData.local;
    const ticketPrice = eventData.ticketPrice;
    const ticketQuantity = (quantityOrError as Quantity).value;
    const date = eventData.date;

    return new Event(id, name, type, local, ticketPrice, ticketQuantity, date);
  }
}
