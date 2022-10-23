import Service from "../middleware/src/service";

const PORT = Number(process.env.PORT) || 0;

Service.create("ticketService", {
  customPort: PORT
})
  .then(async (service) => {
    const configApp = await import("./config/app");
    configApp.default(service);
  })
  .catch(console.error);
