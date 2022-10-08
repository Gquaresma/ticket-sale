import { MissingParamError } from "../controllers/errors/missing-param-error";
import { CreateEvent } from "../../../useCases/event/create-event-data/create-event";
import { CreateEventResponse } from "../../../useCases/event/create-event-data/create-event-response";
import { Request } from "./ports/request";
import { Response } from "./ports/response";
import { EventData } from "../../../entites/event-data";
import { badRequest, ok, serverError } from "./helpers/response-helper";

export class CreateEventController {
  private readonly createEventData: CreateEvent;

  constructor(createEventData: CreateEvent) {
    this.createEventData = createEventData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const invalidField = Object.keys(requestData.data).find(
        (key) => !requestData.data[key]
      );
      if (invalidField) {
        return new MissingParamError(invalidField);
      }

      const eventData = requestData.data as EventData;

      const createEventResponse: CreateEventResponse =
        this.createEventData.createEventData(eventData);

      if (createEventResponse instanceof Error) {
        return badRequest(createEventResponse);
      }
      return ok(eventData);
    } catch (error) {
      return serverError("internal");
    }
  }
}
