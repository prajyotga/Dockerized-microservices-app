const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

module.exports = router;