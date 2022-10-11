import { Event } from "../../../entites/event";
import { EventData } from "../../../entites/event-data";
import { EventRepository } from "../../ports/event-repository";
import { CreateEvent } from "./create-event";

export class CreateEventData implements CreateEvent {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  createEventData(eventData: EventData): EventData | Error {
    const eventOrError: Event | Error = Event.create(eventData);
    if (eventOrError instanceof Error) {
      return eventOrError;
    }
    const event: Event = eventOrError;

    const exists = this.eventRepository.exists(event.id);
    if (!exists) {
      this.eventRepository.addEvent({
        id: event.id,
        name: event.name,
        type: event.type,
        local: event.local,
        ticketPrice: event.ticketPrice,
        date: event.date,
      });
    }
    return eventData;
  }
}
