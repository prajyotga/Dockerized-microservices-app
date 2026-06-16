const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res) => {
  try {
    const { name, description, address, image } = req.body;

    const restaurant = await  Restaurant.create({
      name,
      description,
      address,
      image,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created succesfully",
    });
  } catch (err){
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error){
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.status(400).json({
        success: false,
        message: "restaurant of this id doesnt exists",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch(error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createRestaurant, getRestaurants, getRestaurantById };
