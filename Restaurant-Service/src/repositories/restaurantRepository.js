const Restaurant = require("../models/Restaurant");

// Create Restaurant
const createRestaurant = async (restaurantData) => {
  return await Restaurant.create(restaurantData);
};

// Get All Restaurants
const getAllRestaurants = async () => {
  return await Restaurant.find();
};

// Get Restaurant By Id
const getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};

// Update Restaurant
const updateRestaurant = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, { new: true });
};

// Delete Restaurant
const deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};