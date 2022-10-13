import { Event } from "../../../entites/event/event";
import { EventRepository } from "../../ports/event-repository";
import { RemoveEvent } from "./remove-event";

export class RemoveEventData implements RemoveEvent {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  removeEventById(eventId: string): Event | Error {
    const eventExists = this.eventRepository.exists(eventId);

    if (!eventExists) {
      return new Error(`Event with id ${eventId} not found`);
    }

    const event: Event = this.eventRepository.removeEvent(eventId);
    return event;
  }
}
