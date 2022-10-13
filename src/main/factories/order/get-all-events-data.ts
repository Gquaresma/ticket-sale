import { GetAllOrdersController } from "../../../adapters/presentation/controllers/order-controllers/get-all-orders";
import { InternalOrderRepository } from "../../../external/repositories/internal/internal-order-repository";
import { GetAllOrdersData } from "../../../useCases/order/get-all-orders-data/get-all-orders-data";

export const makeGetAllOrdersController = (): GetAllOrdersController => {
  const orderRepository = InternalOrderRepository.instance;
  const getAllOrderData = new GetAllOrdersData(orderRepository);
  const getAllOrderController = new GetAllOrdersController(getAllOrderData);
  return getAllOrderController;
};
