import { Event } from "../../entites/event";

export interface EventRepository {
  getAllEvents: () => Event[];
  getEventById: (id: string) => Event | undefined;
  exists: (id: string) => boolean;
  addEvent: (event: Event) => Event | undefined;
  updateEvent: (eventData: Event) => Event | undefined;
  removeEvent: (id: string) => Event | undefined;
}
