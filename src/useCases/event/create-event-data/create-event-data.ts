import { Event } from "../../../entites/event/event";
import { EventData } from "../../../entites/event/event-data";
import { EventRepository } from "../../ports/event-repository";
import { CreateEvent } from "./create-event";

export class CreateEventData implements CreateEvent {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  createEventData(eventData: EventData): Event | Error {
    const eventOrError: Event | Error = Event.create(eventData);
    if (eventOrError instanceof Error) {
      return eventOrError;
    }
    const event: Event = eventOrError;

    const newEvent: Event | undefined = this.eventRepository.addEvent(event);

    if (!newEvent) {
      return new Error(`Event with id ${event.id} already exists.`);
    }
  
    return newEvent;
  }
}
