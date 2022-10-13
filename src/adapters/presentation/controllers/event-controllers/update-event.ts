import { MissingParamError } from "../errors/missing-param-error";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { getKeys as getEventDataKeys } from "../../../../entites/event/event-data";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { UpdateEvent } from "../../../../useCases/event/update-event-data/update-event";
import { UpdateEventResponse } from "../../../../useCases/event/update-event-data/update-event-response";
import { Event } from "../../../../entites/event/event";

function checkDataObjectFields(object: any): string | undefined {
  const props = getEventDataKeys();
  const missingField = props.find((prop) => !object[prop]);
  return missingField;
}

export class UpdateEventController {
  private readonly updateEventData: UpdateEvent;

  constructor(updateEventData: UpdateEvent) {
    this.updateEventData = updateEventData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const missingField = checkDataObjectFields(requestData.data);
      if (missingField) return new MissingParamError(missingField);
      if (!requestData.data.id) return new MissingParamError("id");

      const eventData = requestData.data as Event;

      const updateEventResponse: UpdateEventResponse =
        this.updateEventData.updateEventData(eventData);

      if (updateEventResponse instanceof Error) {
        return badRequest(updateEventResponse);
      }
      return ok(eventData);
    } catch (error) {
      return serverError("internal");
    }
  }
}
