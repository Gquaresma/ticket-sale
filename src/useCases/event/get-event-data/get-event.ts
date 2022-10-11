import { GetEventResponse } from "./get-event-response";

export interface GetEvent {
  getEventById: (eventId: string) => GetEventResponse;
}
