import { UpdateEventController } from "../../../adapters/presentation/controllers/event-controllers/update-event";
import { InternalEventRepository } from "../../../external/repositories/internal/internal-event-repository";
import { UpdateEventData } from "../../../useCases/event/update-event-data/update-event-data";

export const makeUpdateEventController = (): UpdateEventController => {
  const eventRepository = InternalEventRepository.instance;
  const updateEventData = new UpdateEventData(eventRepository);
  const updateEventController = new UpdateEventController(updateEventData);
  return updateEventController;
};
