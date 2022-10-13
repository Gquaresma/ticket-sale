import { Event } from "../../../entites/event/event";
import { EventRepository } from "../../ports/event-repository";
import { GetEvent } from "./get-event";

export class GetEventData implements GetEvent {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  getEventById(eventId: string): Event | Error {
    const event: Event | undefined = this.eventRepository.getEventById(eventId);
    if ( !event ) {
      // TODO: make custom error for event not found
      return new Error(`Event with id ${eventId} not found.`)
    }
    return event;
  }
}
