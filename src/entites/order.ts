import { OrderData } from "./order-data";
import { Event } from "./event";
import { v4 as uuid } from "uuid";

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

    const id = eventData instanceof Event ? eventData.id : uuid();
    const name = eventData.name;
    const cpf = eventData.cpf;
    const quantity = eventData.quantity;
    const eventId = eventData.eventId;

    return new Order(id, name, cpf, quantity, eventId);
  }
}
