import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { GetAllEventsResponse } from "../../../../useCases/event/get-all-events-data/get-all-events-response";
import { GetAllEvents } from "../../../../useCases/event/get-all-events-data/get-all-events";

export class GetAllEventsController {
  private readonly getAllEventsData: GetAllEvents;

  constructor(getAllEventsData: GetAllEvents) {
    this.getAllEventsData = getAllEventsData;
  }

  handle(): Response | Error {
    try {
      const getAllEventsResponse: GetAllEventsResponse =
        this.getAllEventsData.getAllEventsData();

      if (getAllEventsResponse instanceof Error) {
        return badRequest(getAllEventsResponse);
      }

      return ok(getAllEventsResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
