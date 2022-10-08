import { CreateEventController } from "../../../adapters/presentation/controllers/event-controller";
import { CreateEventData } from "../../../useCases/event/create-event-data/create-event-data";
import { InMemoryEventRepository } from "../../../useCases/event/in-memory-repository/event-repository-memory";

export const makeCreateEventController = (): CreateEventController => {
  const eventRepository = new InMemoryEventRepository([]);
  const createEventData = new CreateEventData(eventRepository);
  const createEventController = new CreateEventController(createEventData);
  return createEventController;
};
