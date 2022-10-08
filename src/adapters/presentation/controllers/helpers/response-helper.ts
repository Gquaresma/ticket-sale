import { ServerError } from "../errors/server-error";
import { Response } from "../ports/response";

export const badRequest = (error: Error): Response => ({
  status: "error",
  data: error.message,
});

export const ok = (data: any): Response => ({
  status: "success",
  data,
});

export const serverError = (reason: string): Response => ({
  status: "error",
  data: new ServerError(reason),
});
