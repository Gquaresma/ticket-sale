import { RouteRequest } from "../ports/route-request";

export type OnDataFunction = (
  onDataFunction: (data: RouteRequest) => any
) => void;
