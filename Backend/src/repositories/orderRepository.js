const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Find cart by user id
const findCartByUserId = async (userId) => {
  return await Cart.findOne({
    userId,
  }).populate("items.menuItem");
};

// Create Order
const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

// Save Cart
const saveCart = async (cart) => {
  return await cart.save();
};

// Get all orders
const getOrdersByUserId = async (userId) => {
  return await Order.find({
    userId,
  })
    .populate("items.menuItem")
    .sort({ createdAt: -1 });
};

// Get order by id
const getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate(
    "items.menuItem"
  );
};

// Update status
const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
};

module.exports = {
  findCartByUserId,
  createOrder,
  saveCart,
  getOrdersByUserId,
  getOrderById,
  updateOrderStatus,
};