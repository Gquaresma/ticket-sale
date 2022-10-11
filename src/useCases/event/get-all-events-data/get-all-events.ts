import { GetAllEventsResponse } from "./get-all-events-response";

export interface GetAllEvents {
  getAllEventsData: () => GetAllEventsResponse;
}
