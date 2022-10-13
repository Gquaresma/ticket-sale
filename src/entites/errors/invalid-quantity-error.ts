export class InvalidQuantityError extends Error {
    constructor (quantity: number) {
      super(`Quantity must be a non null integer, received: ${quantity}.`)
      this.name = 'InvalidQuantityError'
    }
  }
  