import { MissingParamError } from "../errors/missing-param-error";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { RemoveEvent } from "../../../../useCases/event/remove-event-data/remove-event";
import { RemoveEventResponse } from "../../../../useCases/event/remove-event-data/remove-event-response";

export class RemoveEventController {
  private readonly removeEventData: RemoveEvent;

  constructor(removeEventData: RemoveEvent) {
    this.removeEventData = removeEventData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const eventId = requestData.data.id;
      if (!eventId) {
        const missingParamError = new MissingParamError("id");
        return badRequest(missingParamError);
      }

      const removeEventResponse: RemoveEventResponse =
        this.removeEventData.removeEventById(eventId);

      if (removeEventResponse instanceof Error) {
        return badRequest(removeEventResponse);
      }
      return ok(removeEventResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
