import { Event } from "../../../entites/event";
import { UpdateEventResponse } from "./update-event-response";

export interface UpdateEvent {
  // TODO: checar erro e criar erro específico
  updateEventData: (event: Event) => UpdateEventResponse;
}
