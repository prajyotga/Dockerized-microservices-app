const menuService = require("../services/menuService");

// CREATE MENU

const createMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req.body);

    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      menu,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET MENU OF A RESTAURANT

const getMenu = async (req, res) => {
  try {
    const menu = await menuService.getMenu(
      req.params.restaurantId
    );

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMenu,
  getMenu,
};