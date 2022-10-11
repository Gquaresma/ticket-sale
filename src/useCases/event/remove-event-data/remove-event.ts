import { RemoveEventResponse } from "./remove-event-response";

export interface RemoveEvent {
  removeEventById: (eventId: string) => RemoveEventResponse;
}
