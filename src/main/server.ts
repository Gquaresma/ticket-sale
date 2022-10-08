import Service from "../ticket-system-middleware/src/service";
import { OnDataFunction } from "./types/onDataFunction";

const PORT = Number(process.env.PORT) || 7071;

// TODO: method to get available port auto
Service.create(PORT, "ticketService")
  .then(async (service) => {
    const configApp = await import("./config/app");
    configApp.default(service.setOnData as OnDataFunction);
  })
  .catch(console.error);
