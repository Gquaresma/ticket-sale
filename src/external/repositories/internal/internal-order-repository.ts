import { Order } from "../../../entites/order/order";
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

  addOrder(order: Order): Order {
    this.orders.push(order);
    return order;
  }

  updateOrder(order: Order): Order {
    const id = order.id;
    const objectIndex = this.orders.findIndex((obj) => obj.id === id);
    const oldOrder = this.orders[objectIndex];
    this.orders[objectIndex] = order;
    return oldOrder;
  }

  removeOrder(id: string): Order {
    const objectIndex = this.orders.findIndex((obj) => obj.id === id);
    const removedOrder = this.orders[objectIndex];
    this.orders.splice(objectIndex, 1);
    return removedOrder;
  }
}
