import { MissingParamError } from "../errors/missing-param-error";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { GetEvent } from "../../../../useCases/event/get-event-data/get-event";
import { GetEventResponse } from "../../../../useCases/event/get-event-data/get-event-response";

export class GetEventController {
  private readonly getEventData: GetEvent;

  constructor(getEventData: GetEvent) {
    this.getEventData = getEventData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const eventId = requestData.data.id;
      if (!eventId) return new MissingParamError("id");

      const getEventResponse: GetEventResponse =
        this.getEventData.getEventById(eventId);

      if (getEventResponse instanceof Error) {
        return badRequest(getEventResponse);
      }
      return ok(getEventResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
