const express = require("express");
const router = express.Router();

const {
  createMenu,
  getMenu,
  getMenuItem,
} = require("../controllers/menuController");

// Create Menu
router.post("/", createMenu);

// Get Single Menu Item
router.get("/item/:menuItemId", getMenuItem);

// Get Menu By Restaurant
router.get("/:restaurantId", getMenu);

module.exports = router;