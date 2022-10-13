import { Event } from "../../entites/event/event";

export interface EventRepository {
  getAllEvents: () => Event[];
  getEventById: (id: string) => Event | undefined;
  exists: (id: string) => boolean;
  addEvent: (event: Event) => Event;
  updateEvent: (eventData: Event) => Event;
  removeEvent: (id: string) => Event;
}
