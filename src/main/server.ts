import { InternalEventRepository } from "../external/repositories/internal/internal-event-repository";
import { InternalOrderRepository } from "../external/repositories/internal/internal-order-repository";
import Service from "../middleware/src/service";

const PORT = Number(process.env.PORT) || 0;

Service.create("ticketService", {
  customPort: PORT
})
  .then(async (service) => {
    service.activateDataSync({
      // pathName: dataArray
      "event": InternalEventRepository.instance.events,
      "order": InternalOrderRepository.instance.orders
    })
    const configApp = await import("./config/app");
    configApp.default(service);
  })
  .catch(console.error);
