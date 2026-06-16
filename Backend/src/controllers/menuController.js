const Menu = require("../models/Menu");

// CREATE MENU

const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);

    res.status(201).json({
      success: true,
      message: "menu created succesfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//GET MENU OF THE RESTAURANT

const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find({
      restaurant_id: req.params.restaurantId
    });

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createMenu,getMenu };
