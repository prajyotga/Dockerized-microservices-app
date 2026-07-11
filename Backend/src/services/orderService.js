const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create Order
const createOrder = async (userId) => {
  const cart = await Cart.findOne({
    userId,
  }).populate("items.menuItem");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalAmount = 0;

  cart.items.forEach((item) => {
    totalAmount += item.menuItem.price * item.quantity;
  });

  const order = await Order.create({
    userId,
    items: cart.items.map((item) => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity,
    })),
    totalAmount,
  });

  cart.items = [];

  await cart.save();

  return order;
};

// Get All Orders
const getAllOrder = async (userId) => {
  const orders = await Order.find({
    userId,
  })
    .populate("items.menuItem")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    throw new Error("No orders placed yet");
  }

  return orders;
};

// Get Order By Id
const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate(
    "items.menuItem"
  );

  if (!order) {
    throw new Error("Order Not Found");
  }

  return order;
};

// Update Order Status
const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new Error("Order Not Found");
  }

  return order;
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderStatus,
};