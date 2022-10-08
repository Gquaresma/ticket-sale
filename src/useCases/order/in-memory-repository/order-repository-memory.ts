import { OrderRepository } from "../../ports/order-repository";
import { OrderData } from "../../../entites/order-data";

export class InMemoryOrderRepository implements OrderRepository {
  orders: OrderData[] = [];
  constructor(orders: OrderData[]) {
    this.orders = orders;
  }

  findAllOrders(): OrderData[] {
    return this.orders;
  }

  findOrderByName(name: string): OrderData | null {
    let order: OrderData;

    for (order of this.orders) {
      if (order.name === name) {
        return order;
      }
    }
    return null;
  }

  existOrder(name: string): boolean {
    const exist = this.findOrderByName(name);

    if (!exist) {
      return false;
    }

    return true;
  }

  addOrder(order: OrderData): void {
    const exist = this.existOrder(order.name);

    if (!exist) {
      this.orders.push(order);
    }
  }

  removeOrder(id: string): boolean {
    const objectIndex = this.orders.findIndex((obj) => obj.id === id);

    if (objectIndex >= 0) {
      this.orders.splice(objectIndex, 1);
      return true;
    }

    return false;
  }
}
