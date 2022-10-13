import { Event } from "../../../entites/event/event";
import { EventData } from "../../../entites/event/event-data";
import { EventRepository } from "../../ports/event-repository";
import { GetAllEvents } from "./get-all-events";

export class GetAllEventsData implements GetAllEvents {
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  getAllEventsData(): EventData[] | Error {
    const events: Event[] = this.eventRepository.getAllEvents();
    return events;
  }
}
