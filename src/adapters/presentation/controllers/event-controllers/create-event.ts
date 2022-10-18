import { MissingParamError } from "../errors/missing-param-error";
import { CreateEvent } from "../../../../useCases/event/create-event-data/create-event";
import { CreateEventResponse } from "../../../../useCases/event/create-event-data/create-event-response";
import { Request } from "../ports/request";
import { Response } from "../ports/response";
import { EventData, getKeys as getEventDataKeys} from "../../../../entites/event/event-data";
import { badRequest, ok, serverError } from "../helpers/response-helper";
import { Event } from "../../../../entites/event/event";

function checkDataObjectFields(object: any): string | undefined {
  const props = getEventDataKeys();
  const missingField = props.find((prop) => !object[prop] && object[prop] !== 0);
  return missingField;
}

export class CreateEventController {
  private readonly createEventData: CreateEvent;

  constructor(createEventData: CreateEvent) {
    this.createEventData = createEventData;
  }

  handle(requestData: Request): Response | Error {
    try {
      const missingField = checkDataObjectFields(requestData.data);
      if (missingField) return new MissingParamError(missingField);

      const eventData = requestData.data as Event;

      const createEventResponse: CreateEventResponse =
        this.createEventData.createEventData(eventData);

      if (createEventResponse instanceof Error) {
        return badRequest(createEventResponse);
      }
      
      return ok(createEventResponse);
    } catch (error) {
      return serverError("internal");
    }
  }
}
