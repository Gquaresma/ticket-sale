import { CreateOrderController } from "../../../adapters/presentation/controllers/order-controllers/create-order";
import { InternalOrderRepository } from "../../../external/repositories/internal/internal-order-repository";
import { CreateOrderData } from "../../../useCases/order/create-order-data/create-order-data";

export const makeCreateOrderController = (): CreateOrderController => {
  const orderRepository = InternalOrderRepository.instance;
  const createOrderData = new CreateOrderData(orderRepository);
  const createOrderController = new CreateOrderController(createOrderData);
  return createOrderController;
};
