import { makeCreateEventController } from "../factories/event/create-event-data";
import { MethodController, MethodControllers } from "../ports/method-controller";

function Controllers(path: string): MethodControllers | Error {
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
  controllers: MethodControllers,
  method: string
): MethodController {
  const allowedMethods = Object.keys(controllers);
  if (!allowedMethods.includes(method)) {
    new Error(`Method ${method} not allowed.`);
  }
  return controllers[method];
}


export function getController(path: string, method: string): MethodController | Error {
    const controllersOrError = Controllers(path);
    if (controllersOrError instanceof Error) {
        return controllersOrError;
    }
    const controllers: MethodControllers = controllersOrError;
    const routeControllerOrError = chooseControllerByMethod(controllers, method);
    return routeControllerOrError;
}