import { Event } from "../../entites/event";

export interface EventRepository {
  findAllEvents: () => Event[];
  findEventByName: (name: string) => Event | null;
  exists: (name: string) => boolean;
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => boolean;
}
