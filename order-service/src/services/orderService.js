const orderRepository = require("../repositories/orderRepository");

// Create Order



const createOrder = async (userId) => {
  const cart = await orderRepository.findCartByUserId(
    userId
  );

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

  cart.items = [];

  await orderRepository.saveCart(cart);

  return order;
};

// Get All Orders
const getAllOrder = async (userId) => {
  const orders =
    await orderRepository.getOrdersByUserId(userId);

  if (!orders || orders.length === 0) {
    throw new Error("No orders placed yet");
  }

  return orders;
};

// Get Order By Id
const getOrderById = async (orderId) => {
  const order =
    await orderRepository.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
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

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderStatus,
};