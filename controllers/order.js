const prisma = require("../db");
const Events = require("./event");

async function getOrders() {
  try {
    const orders = await prisma.order.findMany();
    return {
      statusCode: 200,
      data: orders
    }
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function getOrder(orderId) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return {
        statusCode: 404,
        data: { message: 'This order does not exist.' }
      }
    }

    return {
      statusCode: 200,
      data: order
    }
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function createOrder(orderData, eventId) {
  try {

    console.log("Order data ->", orderData);
    const { clientName, clientCPF, quantity } = JSON.parse(orderData);

    const { statusCode, data: event } = await Events.getEvent(eventId);

    if ( statusCode !== 200 ) {
      return {
        statusCode: 400,
        data: { message: 'Invalid event id, this event does not exist.' }
      }
    }

    const hasQuantity = event.ticketQuantity >= quantity;

    if (!hasQuantity) {
      throw new Error("Quantity exceeds available quantity of tickets.");
    }

    const order = await prisma.order.create({
      data: {
        clientName,
        clientCPF,
        quantity: parseInt(quantity),
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });
    
    await Events.updateEvent(
      event.id,
      JSON.stringify({
        ticketQuantity: parseInt(event.ticketQuantity) - quantity,
      })
    );

    return {
      statusCode: 200,
      data: order
    }
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function removeOrder(orderId) {
  try {
    const orderExists = (await getOrder(orderId)).statusCode === 200;

    if ( !orderExists ) {
      return {
        statusCode: 400,
        data: { message: "Invalid order id, this order does not exist." }
      }
    }

    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    const { _, data: event } = await Events.getEvent(deletedOrder.eventId);

    await Events.updateEvent(
      event.id,
      JSON.stringify({
        ticketQuantity: event.ticketQuantity + deletedOrder.quantity,
      })
    );

    return {
      statusCode: 200,
      data: { message: "item deleted successfuly" }
    }
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

async function updateOrder(orderId, order) {
  try {
    const { statusCode, data: oldOrder } = await getOrder(orderId);

    if ( statusCode !== 200 ) {
      return {
        statusCode: 400,
        data: { message: "Invalid order id, this order does not exist." }
      }
    }

    const { clientName, clientCPF, quantity } = JSON.parse(order);

    const quantityDiff = oldOrder.quantity - quantity;
    const newQuantity = quantity === undefined
        ? parseInt(oldOrder.quantity)
        : parseInt(quantity);

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        clientName: clientName || oldOrder.clientName,
        clientCPF: clientCPF || oldOrder.clientCPF,
        quantity: newQuantity,
      },
    });

    const {_, data: event} = await Events.getEvent(updatedOrder.eventId);

    await Events.updateEvent(
      event.id,
      JSON.stringify({
        ticketQuantity: event.ticketQuantity + quantityDiff,
      })
    );

    return {
      statusCode: 200,
      data: updatedOrder
    }
  } catch (error) {
    return {
      statusCode: 500,
      data: { error: error.message },
    };
  }
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  removeOrder,
  updateOrder,
};
