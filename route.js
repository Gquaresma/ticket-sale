const http = require("http");
const Orders = require("./controllers/order");
const Events = require("./controllers/event");

module.exports = http.createServer(async (req, res) => {
  console.log("got request: ", req.url);
  switch (req.method) {
    case "GET":
      return handleGetReq(req, res);
    case "POST":
      return handlePostReq(req, res);
    case "DELETE":
      return handleDeleteReq(req, res);
    case "PUT":
      return handlePutReq(req, res);
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
      break;
  }
});

// --- Handle methods

function handleResponse(res, { data, statusCode }) {
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

// GET
async function handleGetReq(req, res) {
  const { pathname, searchParams } = new URL(req.url, "https://service-1-1.herokuapp.com/");

  if (pathname.startsWith("/event")) {
    const eventId = searchParams.get("eventId");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    if (eventId) {
      return handleResponse(res, await Events.getEvent(eventId));
    } else {
      return handleResponse(res, await Events.getEvents());
    }
  } else if (pathname.startsWith("/order")) {
    const orderId = searchParams.get("orderId");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    if (orderId) {
      return handleResponse(res, await Orders.getOrder(orderId));
    } else {
      return handleResponse(res, await Orders.getOrders());
    }
  } else {
    return handleNotFound(res, 404);
  }
}

// POST
function handlePostReq(req, res) {
  const { pathname, searchParams } = new URL(req.url, "https://service-1-1.herokuapp.com/");

  if (pathname.startsWith("/event")) {
    let newEvent = [];
    req
      .once("data", (chunk) => {
        newEvent.push(chunk);
      })
      .once("end", async () => {
        res.setHeader("Content-Type", "application/json");
        newEvent = Buffer.concat(newEvent).toString();
        return handleResponse(res, await Events.createEvent(newEvent));
      });
  } else if (pathname.startsWith("/order")) {
    const eventId = searchParams.get("eventId");
    let newOrder = [];
    req
      .once("data", (chunk) => {
        newOrder.push(chunk);
      })
      .once("end", async () => {
        newOrder = Buffer.concat(newOrder).toString();
        res.setHeader("Content-Type", "application/json");
        return handleResponse(res, await Orders.createOrder(newOrder, eventId));
      });
  } else {
    return handleNotFound(res, 404);
  }
}

// DELETE
async function handleDeleteReq(req, res) {
  const { pathname, searchParams } = new URL(req.url, "https://service-1-1.herokuapp.com/");
  if (pathname.startsWith("/event")) {
    const eventId = searchParams.get("eventId");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    return handleResponse(res, await Events.removeEvent(eventId));
  } else if (pathname.startsWith("/order")) {
    const orderId = searchParams.get("orderId");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    return handleResponse(res, await Orders.removeOrder(orderId));
  } else {
    return handleNotFound(res, 404);
  }
}

// PUT
function handlePutReq(req, res) {
  const { pathname, searchParams } = new URL(req.url, "https://service-1-1.herokuapp.com/");

  if (pathname.startsWith("/event")) {
    const eventId = searchParams.get("eventId");
    let updatedEvent = [];
    req
      .once("data", (chunk) => {
        updatedEvent.push(chunk);
      })
      .once("end", async () => {
        res.setHeader("Content-Type", "application/json");
        updatedEvent = Buffer.concat(updatedEvent).toString();
        return handleResponse(
          res,
          await Events.updateEvent(eventId, updatedEvent)
        );
      });
  } else if (pathname.startsWith("/order")) {
    const orderId = searchParams.get("orderId");
    let updatedOrder = [];
    req
      .once("data", (chunk) => {
        updatedOrder.push(chunk);
      })
      .once("end", async () => {
        updatedOrder = Buffer.concat(updatedOrder).toString();
        res.setHeader("Content-Type", "application/json");
        return handleResponse(
          res,
          await Orders.updateOrder(orderId, updatedOrder)
        );
      });
  } else {
    return handleNotFound(res);
  }
}

function handleNotFound(res) {
  res.statusCode = 404;
  res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
}
