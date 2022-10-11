import { GetEventController } from "../../../adapters/presentation/controllers/event-controllers/get-event";
import { InternalEventRepository } from "../../../external/repositories/internal/internal-event-repository";
import { GetEventData } from "../../../useCases/event/get-event-data/get-event-data";

export const makeGetEventController = (): GetEventController => {
  const eventRepository = InternalEventRepository.instance;
  const getEventData = new GetEventData(eventRepository);
  const getEventController = new GetEventController(getEventData);
  return getEventController;
};
