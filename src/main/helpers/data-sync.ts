import { Response } from "../../adapters/presentation/controllers/ports/response";
import { InternalEventRepository } from "../../external/repositories/internal/internal-event-repository";
import { InternalOrderRepository } from "../../external/repositories/internal/internal-order-repository";
import { RouteRequest } from "../ports/route-request";

export const dataSync = (request: RouteRequest): Response => {
  const { path, data } = request;
  const dataList = data.dataList;
  switch (path) {
    case "event":
      InternalEventRepository.instance.updateDataList(dataList);
      break;
    case "order":
      InternalOrderRepository.instance.updateDataList(dataList);
      break;
    default:
      break;
  }
  return {
    status: "success",
    data: {},
  };
};
