import { Event } from "../../../entites/event/event";
import { EventRepository } from "../../ports/event-repository";
import { RemoveEvent } from "./remove-event";

export class RemoveEventData implements RemoveEvent {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  removeEventById(eventId: string): Event | Error {
    const event: Event | undefined = this.eventRepository.removeEvent(eventId);
    if ( !event ) {
      // TODO: make custom error for event not found
      return new Error(`Event with id ${eventId} not found.`)
    }
    return event;
  }
}
