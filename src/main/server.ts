import Service from "../middleware/src/service";

const PORT = Number(process.env.PORT) || 0;

Service.create(PORT, "ticketService")
  .then(async (service) => {
    const configApp = await import("./config/app");
    configApp.default(service);
  })
  .catch(console.error);
