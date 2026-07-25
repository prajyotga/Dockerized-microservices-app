// const Menu = require("../models/Menu");
const Cart = require("../models/Cart");

// Add Item to Cart
const addCart = async (userId, menuItemId) => {
  const menu = await Menu.findById(menuItemId);

  if (!menu) {
    throw new Error("Menu item not found");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [
        {
          menuItem: menuItemId,
          quantity: 1,
        },
      ],
    });

    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      menuItem: menuItemId,
      quantity: 1,
    });
  }

  await cart.save();

  return cart;
};

// Get Cart
const getCart = async (userId) => {
  const cart = await Cart.findOne({
    userId,
  }).populate("items.menuItem");

  return cart;
};

// Remove Item
const removeCart = async (userId, menuItemId) => {
  const cart = await Cart.findOne({
    userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.menuItem.toString() !== menuItemId
  );

  await cart.save();

  return cart;
};

// Increase Quantity
const increaseQuantity = async (userId, menuItemId) => {
  const cart = await Cart.findOne({
    userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId
  );

  if (!item) {
    throw new Error("Item not found");
  }

  item.quantity++;

  await cart.save();

  return cart;
};

// Decrease Quantity
const decreaseQuantity = async (userId, menuItemId) => {
  const cart = await Cart.findOne({
    userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId
  );

  if (!item) {
    throw new Error("Item not found");
  }

  item.quantity--;

  if (item.quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItemId
    );
  }

  await cart.save();

  return cart;
};

module.exports = {
  addCart,
  getCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
};