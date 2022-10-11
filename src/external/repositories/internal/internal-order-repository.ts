import { Order } from "../../../entites/order";
import { OrderRepository } from "../../../useCases/ports/order-repository";
import { InternalEventRepository } from "./internal-event-repository";

export class InternalOrderRepository implements OrderRepository {
  private internalEventRepository: InternalEventRepository;
  private static _instance: InternalOrderRepository;
  orders: Order[] = [];

  constructor(
    internalEventRepository: InternalEventRepository,
    orders: Order[]
  ) {
    this.orders = orders;
    this.internalEventRepository = internalEventRepository;
  }

  public static get instance() {
    const internalEventRepository = InternalEventRepository.instance;
    return (
      this._instance || (this._instance = new this(internalEventRepository, []))
    );
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    const order: Order | undefined = this.orders.find(
      (order) => order.id === id
    );
    return order;
  }

  exists(id: string): boolean {
    const exist = this.getOrderById(id);

    if (!exist) {
      return false;
    }

    return true;
  }

  addOrder(order: Order): void {
    const exist = this.getOrderById(order.id);

    if (exist) return;

    const eventExists = this.internalEventRepository.exists(order.eventId);
    if (eventExists) {
      this.orders.push(order);
    }
  }

  updateOrder(order: Order): Order | undefined {
    const id = order.id;
    const objectIndex = this.orders.findIndex((obj) => obj.id === id);

    if (objectIndex < 0) {
      return undefined;
    }

    const eventExists = this.internalEventRepository.exists(order.eventId);

    if (!eventExists) {
      // TODO: discuss -> should implement errors for different situations?
      return undefined;
    }

    const oldOrder = this.orders[objectIndex];
    this.orders[objectIndex] = order;

    return oldOrder;
  }

  removeOrder(id: string): Order | undefined {
    const objectIndex = this.orders.findIndex((obj) => obj.id === id);

    if (objectIndex >= 0) {
      const removedOrder = this.orders[objectIndex];
      this.orders.splice(objectIndex, 1);
      return removedOrder;
    }

    return undefined;
  }
}
