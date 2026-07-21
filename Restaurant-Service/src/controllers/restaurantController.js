const restaurantService = require("../services/restaurantService");

// Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, description, address, image } = req.body;

    const userId = req.headers["x-user-id"];

    const restaurant = await restaurantService.createRestaurant(
      name,
      description,
      address,
      image,
      userId
    );

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Restaurants
const getRestaurants = async (req, res) => {
  try {
      console.log("GET RESTAURANTS CONTROLLER HIT");
    const restaurants = await restaurantService.getRestaurants();

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Restaurant By Id
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
};