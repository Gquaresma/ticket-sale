import Service from "../../middleware/src/service";
import setupRoutes from "./routes";

export default function (service: Service) {
  setupRoutes(service);
}
