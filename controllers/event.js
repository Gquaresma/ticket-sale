const prisma = require("../db");

async function getEvents() {
  try {
    const orders = await prisma.event.findMany();
    return {
      statusCode: 200,
      data: orders,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function getEvent(eventId) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return {
        statusCode: 404,
        data: { message: "This event does not exist." },
      };
    }

    return {
      statusCode: 200,
      data: event,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function createEvent(event) {
  try {
    const { name, type, local, ticketPrice, date, ticketQuantity } =
      JSON.parse(event);

    const createdEvent = await prisma.event.create({
      data: {
        name,
        type,
        local,
        ticketPrice: Number(ticketPrice),
        date,
        ticketQuantity: parseInt(ticketQuantity),
      },
    });

    return {
      statusCode: 200,
      data: createdEvent,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function removeEvent(eventId) {
  try {
    const eventExists = (await getEvent(eventId)).statusCode === 200;

    if (!eventExists) {
      return {
        statusCode: 404,
        data: { message: "This event does not exist." },
      };
    }

    const deletedEvent = await prisma.event.delete({
      where: { id: eventId },
    });
    return {
      statusCode: 200,
      data: deletedEvent,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function updateEvent(eventId, event) {
  try {
    const {statusCode, data: oldEvent} = await getEvent(eventId);

    if (statusCode !== 200) {
      return {
        statusCode: 404,
        data: { message: "This event does not exist." },
      };
    }

    const { name, type, local, ticketPrice, date, ticketQuantity } =
      JSON.parse(event);

    const newQuantity =
      ticketQuantity === undefined
        ? parseInt(oldEvent.ticketQuantity)
        : parseInt(ticketQuantity);

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        ticketPrice: Number(ticketPrice) || oldEvent.ticketPrice,
        name: name || oldEvent.name,
        type: type || oldEvent.type,
        date: date || oldEvent.date,
        local: local || oldEvent.local,
        ticketQuantity: newQuantity,
      },
    });

    return {
      statusCode: 200,
      data: updatedEvent,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  removeEvent,
  updateEvent,
};
