const axios = require("axios");
const cartRepository = require("../repositories/cartRepository");

// Add Item to Cart
const addCart = async (userId, menuItemId) => {

  // Verify Menu Item from Menu Service
  try {
    await axios.get(
      `${process.env.MENU_SERVICE}/api/menu/item/${menuItemId}`
    );
  } catch (err) {
    throw new Error("Menu item not found");
  }

  let cart = await cartRepository.findCartByUserId(userId);

  if (!cart) {
    await cartRepository.createCart({
      userId,
      items: [
        {
          menuItem: menuItemId,
          quantity: 1,
        },
      ],
    });

    return await getCart(userId);
  }

  const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({
      menuItem: menuItemId,
      quantity: 1,
    });
  }

  await cartRepository.saveCart(cart);

  return await getCart(userId);
};

// Get Cart
const getCart = async (userId) => {

  const cart = await cartRepository.findCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const items = await Promise.all(
    cart.items.map(async (item) => {

      const response = await axios.get(
        `${process.env.MENU_SERVICE}/api/menu/item/${item.menuItem}`
      );

      return {
        _id: item._id,
        quantity: item.quantity,
        menuItem: response.data.menu,
      };
    })
  );

  return {
    ...cart.toObject(),
    items,
  };
};

// Remove Item
const removeCart = async (userId, menuItemId) => {

  const cart = await cartRepository.findCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.menuItem.toString() !== menuItemId
  );

  await cartRepository.saveCart(cart);

  return await getCart(userId);
};

// Increase Quantity
const increaseQuantity = async (userId, menuItemId) => {

  const cart = await cartRepository.findCartByUserId(userId);

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

  await cartRepository.saveCart(cart);

  return await getCart(userId);
};

// Decrease Quantity
const decreaseQuantity = async (userId, menuItemId) => {

  const cart = await cartRepository.findCartByUserId(userId);

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

  await cartRepository.saveCart(cart);

  return await getCart(userId);
};

module.exports = {
  addCart,
  getCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
};