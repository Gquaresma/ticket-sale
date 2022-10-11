import { CreateEventController } from "../../../adapters/presentation/controllers/event-controllers/create-event";
import { InternalEventRepository } from "../../../external/repositories/internal/internal-event-repository";
import { CreateEventData } from "../../../useCases/event/create-event-data/create-event-data";

export const makeCreateEventController = (): CreateEventController => {
  const eventRepository = InternalEventRepository.instance;
  const createEventData = new CreateEventData(eventRepository);
  const createEventController = new CreateEventController(createEventData);
  return createEventController;
};
