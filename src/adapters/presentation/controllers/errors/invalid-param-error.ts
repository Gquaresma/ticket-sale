export class InvalidParamError extends Error {
  constructor(paramName: string, entityName: string) {
    super(`Param ${paramName} does not exist in ${entityName}.`);
    this.name = "InvalidParamError";
  }
}
