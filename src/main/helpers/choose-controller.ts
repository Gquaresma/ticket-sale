import { makeCreateEventController } from "../factories/event/create-event-data";
import { Controller, ControllerFactories } from "../ports/method-controller";

function Controllers(path: string): ControllerFactories | Error {
  const Paths: { [key: string]: any } = {
    event: {
      get: makeCreateEventController,
      getAll: makeCreateEventController,
      post: makeCreateEventController,
      update: makeCreateEventController,
      remove: makeCreateEventController,
    },
    order: {
      get: makeCreateEventController,
      getAll: makeCreateEventController,
      post: makeCreateEventController,
      update: makeCreateEventController,
      remove: makeCreateEventController,
    },
    default: new Error(`Path ${path} does not exist.`),
  };

  return Paths[path] || Paths.default;
}

function chooseControllerByMethod(
  controllersFactories: ControllerFactories,
  method: string
): Controller {
  const allowedMethods = Object.keys(controllersFactories);
  if (!allowedMethods.includes(method)) {
    new Error(`Method ${method} not allowed.`);
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