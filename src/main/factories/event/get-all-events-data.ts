import { GetAllEventsController } from "../../../adapters/presentation/controllers/event-controllers/get-all-events";
import { InternalEventRepository } from "../../../external/repositories/internal/internal-event-repository";
import { GetAllEventsData } from "../../../useCases/event/get-all-events-data/get-all-events-data";

export const makeGetAllEventsController = (): GetAllEventsController => {
  const eventRepository = InternalEventRepository.instance;
  const getAllEventsData = new GetAllEventsData(eventRepository);
  const getAllEventsController = new GetAllEventsController(getAllEventsData);
  return getAllEventsController;
};
