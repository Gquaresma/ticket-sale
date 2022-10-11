import { RemoveEventController } from "../../../adapters/presentation/controllers/event-controllers/remove-event";
import { InternalEventRepository } from "../../../external/repositories/internal/internal-event-repository";
import { RemoveEventData } from "../../../useCases/event/remove-event-data/remove-event-data";

export const makeRemoveEventController = (): RemoveEventController => {
  const eventRepository = InternalEventRepository.instance;
  const removeEventData = new RemoveEventData(eventRepository);
  const removeEventController = new RemoveEventController(removeEventData);
  return removeEventController;
};
