const menuRepository = require("../repositories/menuRepository");

// Create Menu
const createMenu = async (menuData) => {
  return await menuRepository.createMenu(menuData);
};

// Get Menu By Restaurant
const getMenu = async (restaurantId) => {
  return await menuRepository.getMenuByRestaurantId(restaurantId);
};

// Get Single Menu Item
const getMenuItem = async (menuItemId) => {
  const menu = await menuRepository.getMenuById(menuItemId);

  if (!menu) {
    throw new Error("Menu item not found");
  }

  return menu;
};

module.exports = {
  createMenu,
  getMenu,
  getMenuItem,
};