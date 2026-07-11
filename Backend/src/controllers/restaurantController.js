const restaurantService = require("../services/restaurantService");

const createRestaurant = async (req, res) => {
  try {
    const { name, description, address, image } = req.body;

    const restaurant =
      await restaurantService.createRestaurant(
        name,
        description,
        address,
        image,
        req.user.id
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

const getRestaurants = async (req, res) => {
  try {
    const restaurants =
      await restaurantService.getRestaurants();

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

const getRestaurantById = async (req, res) => {
  try {
    const restaurant =
      await restaurantService.getRestaurantById(
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

module.exports={getRestaurantById,getRestaurants,createRestaurant}