import { Event } from "../../../entites/event/event";
import { EventRepository } from "../../../useCases/ports/event-repository";

const TEST_EVENT = {
  id: "test",
  name: "test",
  type: "test",
  local: "test",
  ticketPrice: 0,
  ticketQuantity: 0,
  date: "test",
};

export class InternalEventRepository implements EventRepository {
  private static _instance: InternalEventRepository;
  events: Event[] = [];

  constructor(events: Event[]) {
    this.events = events;
  }

  public static get instance() {
    return this._instance || (this._instance = new this([TEST_EVENT]));
  }

  getAllEvents(): Event[] {
    return this.events;
  }

  getEventById(id: string): Event | undefined {
    const event: Event | undefined = this.events.find(
      (event) => event.id === id
    );
    return event;
  }

  exists(id: string): boolean {
    const exist = this.getEventById(id);

    if (!exist) {
      return false;
    }

    return true;
  }

  addEvent(event: Event): Event {
    this.events.push(event);
    return event;
  }

  updateEvent(eventData: Event): Event {
    const id = eventData.id;
    const objectIndex = this.events.findIndex((obj) => obj.id === id);
    const oldEvent = this.events[objectIndex];
    this.events[objectIndex] = eventData;
    return oldEvent;
  }

  removeEvent(id: string): Event {
    const objectIndex = this.events.findIndex((obj) => obj.id === id);
    const removedEvent = this.events[objectIndex];
    this.events.splice(objectIndex, 1);
    return removedEvent;
  }
}
