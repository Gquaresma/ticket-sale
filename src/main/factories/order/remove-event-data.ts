import { RemoveOrderController } from "../../../adapters/presentation/controllers/order-controllers/remove-order";
import { InternalOrderRepository } from "../../../external/repositories/internal/internal-order-repository";
import { RemoveOrderData } from "../../../useCases/order/remove-order-data/remove-order-data";

export const makeRemoveOrderController = (): RemoveOrderController => {
  const orderRepository = InternalOrderRepository.instance;
  const removeOrderData = new RemoveOrderData(orderRepository);
  const removeOrderController = new RemoveOrderController(removeOrderData);
  return removeOrderController;
};
