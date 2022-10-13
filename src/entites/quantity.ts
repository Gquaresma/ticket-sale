import { InvalidQuantityError } from "./errors/invalid-quantity-error";

export class Quantity {
  private readonly quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
  }

  static create(quantity: number): Quantity | Error {
    if (Quantity.validate(quantity)) {
      return new Quantity(quantity);
    }
    return new InvalidQuantityError(quantity);
  }

  get value(): number {
    return this.quantity;
  }

  static validate(quantity: number): boolean {
    if (isNaN(quantity)) {
      return false;
    }
    return parseInt(quantity.toString()) == quantity;
  }
}
