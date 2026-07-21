const restaurantRepository = require("../repositories/restaurantRepository");

// Create Restaurant
const createRestaurant = async (
  name,
  description,
  address,
  image,
  owner
) => {
  return await restaurantRepository.createRestaurant({
    name,
    description,
    address,
    image,
    owner,
  });
};

// Get All Restaurants
const getRestaurants = async () => {
  return await restaurantRepository.getAllRestaurants();
};

// Get Restaurant By Id
const getRestaurantById = async (restaurantId) => {
  const restaurant =
    await restaurantRepository.getRestaurantById(restaurantId);

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