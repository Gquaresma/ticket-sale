import { GetOrderController } from "../../../adapters/presentation/controllers/order-controllers/get-order";
import { InternalOrderRepository } from "../../../external/repositories/internal/internal-order-repository";
import { GetOrderData } from "../../../useCases/order/get-order-data/get-order-data";

export const makeGetOrderController = (): GetOrderController => {
  const orderRepository = InternalOrderRepository.instance;
  const getOrderData = new GetOrderData(orderRepository);
  const getOrderController = new GetOrderController(getOrderData);
  return getOrderController;
};
