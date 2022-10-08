import { EventData } from "../../../entites/event-data";
import { CreateEventResponse } from "./create-event-response";

export interface CreateEvent {
  // TODO: checar erro e criar erro específico
  createEventData: (event: EventData) => CreateEventResponse;
}
