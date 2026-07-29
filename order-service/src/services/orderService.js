const orderRepository = require("../repositories/orderRepository");
const axios=require("axios");
// Create Order



const createOrder = async (userId) => {
 const cart = await orderRepository.findCartByUserId(userId);

  

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalAmount = 0;

  cart.items.forEach((item) => {
    totalAmount += item.menuItem.price * item.quantity;
  });

  const order = await orderRepository.createOrder({
  userId,
  items: cart.items.map((item) => ({
    menuItem: item.menuItem._id,
    quantity: item.quantity,
  })),
  totalAmount,
});

await orderRepository.clearCart(userId);

  return order;
};


const getAllOrder = async (userId) => {

  const orders = await orderRepository.getOrdersByUserId(userId);

  if (!orders || orders.length === 0) {
    throw new Error("No orders placed yet");
  }

  const enrichedOrders = await Promise.all(

    orders.map(async (order) => {

      const items = await Promise.all(

        order.items.map(async (item) => {

          const response = await axios.get(
            `${process.env.MENU_SERVICE}/api/menu/item/${item.menuItem}`
          );

          return {
            ...item.toObject(),
            menuItem: response.data.menu,
          };

        })

      );

      return {
        ...order.toObject(),
        items,
      };

    })

  );

  return enrichedOrders;
};

// Get Order By Id
const getOrderById = async (orderId) => {

  const order = await orderRepository.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const items = await Promise.all(

    order.items.map(async (item) => {

      const response = await axios.get(
        `${process.env.MENU_SERVICE}/api/menu/item/${item.menuItem}`
      );

      return {
        ...item.toObject(),
        menuItem: response.data.menu,
      };

    })

  );

  return {
    ...order.toObject(),
    items,
  };
};

// Update Status
const updateOrderStatus = async (
  orderId,
  status
) => {
  const order =
    await orderRepository.updateOrderStatus(
      orderId,
      status
    );

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};


// update payment

const updatePayment = async (orderId, paymentData) => {
  return await orderRepository.updatePayment(
    orderId,
    paymentData
  );
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderStatus,
  updatePayment
};