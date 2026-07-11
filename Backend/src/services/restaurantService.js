const Restaurant = require("../models/Restaurant");

// Create Restaurant
const createRestaurant = async (
  name,
  description,
  address,
  image,
  owner
) => {
  const restaurant = await Restaurant.create({
    name,
    description,
    address,
    image,
    owner,
  });

  return restaurant;
};

// Get All Restaurants
const getRestaurants = async () => {
  const restaurants = await Restaurant.find({});

  return restaurants;
};

// Get Restaurant By Id
const getRestaurantById = async (restaurantId) => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
};