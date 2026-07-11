const Menu = require("../models/Menu");

// Create Menu
const createMenu = async (menuData) => {
  const menu = await Menu.create(menuData);

  return menu;
};

// Get Menu By Restaurant
const getMenu = async (restaurantId) => {
  const menu = await Menu.find({
    restaurant_id: restaurantId,
  });

  return menu;
};

module.exports = {
  createMenu,
  getMenu,
};