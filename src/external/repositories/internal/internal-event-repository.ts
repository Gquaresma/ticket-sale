
import { Event } from "../../../entites/event";
import { EventRepository } from "../../../useCases/ports/event-repository";

export class InternalEventRepository implements EventRepository {
  events: Event[] = [];
  constructor(events: Event[]) {
    this.events = events;
  }

  findAllEvents(): Event[] {
    return this.events;
  }

  // TODO: Ajustar findEventByName para findEventById
  findEventByName(name: string): Event | null {
    let event: Event;

    for (event of this.events) {
      if (event.name === name) {
        return event;
      }
    }
    return null;
  }

  exists(name: string): boolean {
    const exist = this.findEventByName(name);

    if (!exist) {
      return false;
    }

    return true;
  }

  addEvent(event: Event): void {
    const exist = this.findEventByName(event.name);

    if (!exist) {
      this.events.push(event);
    }
  }

  // TODO: CRIAR UPDATE

  removeEvent(id: string): boolean {
    const objectIndex = this.events.findIndex((obj) => obj.id === id);

    if (objectIndex >= 0) {
      this.events.splice(objectIndex, 1);
      return true;
    }

    return false;
  }
}
