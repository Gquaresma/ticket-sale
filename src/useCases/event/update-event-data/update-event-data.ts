import { Event } from "../../../entites/event";
import { EventData } from "../../../entites/event-data";
import { EventRepository } from "../../ports/event-repository";
import { UpdateEvent } from "./update-event";

export class UpdateEventData implements UpdateEvent {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  updateEventData(event: Event): EventData | Error {
    const newEventOrError: Event | Error = Event.create(event);
    if (newEventOrError instanceof Error) {
      return newEventOrError;
    }
    const newEvent: Event = newEventOrError;

    const oldEvent = this.eventRepository.updateEvent(event);
    if ( !oldEvent ) {
      // TODO: make custom error
      return new Error(`Event with id ${event.id} not found`);
    }
    return oldEvent;
  }
}
