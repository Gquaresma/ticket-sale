import { UpdateOrderController } from "../../../adapters/presentation/controllers/order-controllers/update-event";
import { InternalEventRepository } from "../../../external/repositories/internal/internal-event-repository";
import { InternalOrderRepository } from "../../../external/repositories/internal/internal-order-repository";
import { UpdateOrderData } from "../../../useCases/order/update-order-data/update-order-data";

export const makeUpdateOrderController = (): UpdateOrderController => {
  const orderRepository = InternalOrderRepository.instance;
  const eventRepository = InternalEventRepository.instance;
  const updateOrderData = new UpdateOrderData(orderRepository, eventRepository);
  const updateOrderController = new UpdateOrderController(updateOrderData);
  return updateOrderController;
};
