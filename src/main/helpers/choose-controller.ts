import { makeCreateEventController } from "../factories/event/create-event-data";
import { makeGetAllEventsController } from "../factories/event/get-all-events-data";
import { makeGetEventController } from "../factories/event/get-event-data";
import { makeRemoveEventController } from "../factories/event/remove-event-data";
import { makeUpdateEventController } from "../factories/event/update-event-data";
import { Controller, ControllerFactories } from "../ports/method-controller";

function Controllers(path: string): ControllerFactories | Error {
  const Paths: { [key: string]: any } = {
    event: {
      get: makeGetEventController,
      getAll: makeGetAllEventsController,
      post: makeCreateEventController,
      update: makeUpdateEventController,
      delete: makeRemoveEventController,
    },
    order: {
      // TODO: replace with order factories
      get: makeCreateEventController,
      getAll: makeCreateEventController,
      post: makeCreateEventController,
      update: makeCreateEventController,
      delete: makeCreateEventController,
    },
    default: new Error(`Path ${path} does not exist.`),
  };

  return Paths[path] || Paths.default;
}

function chooseControllerByMethod(
  controllersFactories: ControllerFactories,
  method: string
): Controller | Error {
  const allowedMethods = Object.keys(controllersFactories);
  if (!allowedMethods.includes(method)) {
    return new Error(`Method ${method} not allowed.`);
  }
  return controllersFactories[method]();
}


export function getController(path: string, method: string): Controller | Error {
    const controllersOrError = Controllers(path);
    if (controllersOrError instanceof Error) {
        return controllersOrError;
    }
    const controllers: ControllerFactories = controllersOrError;
    const routeControllerOrError = chooseControllerByMethod(controllers, method);
    return routeControllerOrError;
}