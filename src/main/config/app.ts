import { RouteRequest } from "../ports/route-request";
import setupRoutes from "./routes";

export default function (
  onData: (onDataFunction: (data: RouteRequest) => any) => void
) {
  setupRoutes(onData);
}
