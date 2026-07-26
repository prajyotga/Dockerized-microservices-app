const Cart = require("../models/Cart");

// Find Cart By User
const findCartByUserId = async (userId) => {
  return await Cart.findOne({ userId });
};

// Create Cart
const createCart = async (cartData) => {
  return await Cart.create(cartData);
};

// Save Cart
const saveCart = async (cart) => {
  return await cart.save();
};

module.exports = {
  findCartByUserId,
  createCart,
  saveCart,
};