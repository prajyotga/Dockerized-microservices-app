const Menu = require("../models/Menu");

// Create Menu
const createMenu = async (menuData) => {
  return await Menu.create(menuData);
};

// Get Menu By Restaurant
const getMenuByRestaurantId = async (restaurantId) => {
  return await Menu.find({
    restaurant_id: restaurantId,
  });
};

// Get Single Menu Item
const getMenuById = async (menuItemId) => {
  return await Menu.findById(menuItemId);
};

module.exports = {
  createMenu,
  getMenuByRestaurantId,
  getMenuById,
};