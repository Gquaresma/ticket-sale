export class MissingParamValueError extends Error {
  constructor(paramName: string) {
    super("Missing value of param: " + paramName);
    this.name = "MissingParamValueError";
  }
}
