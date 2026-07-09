require("dotenv").config();

const mongoose = require("mongoose");

const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

const restaurants = require("./restaurants");
const menus = require("./menu");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log("Clearing old data...");

    await Menu.deleteMany({});
    await Restaurant.deleteMany({});

    console.log("Old data removed.");

    const insertedRestaurants = await Restaurant.insertMany(restaurants);

    console.log(`${insertedRestaurants.length} restaurants inserted.`);

    for (const restaurant of insertedRestaurants) {
      const restaurantMenus = menus[restaurant.name];

      if (!restaurantMenus) continue;

      const menuDocuments = restaurantMenus.map((item) => ({
        ...item,
        restaurant_id: restaurant._id,
      }));

      await Menu.insertMany(menuDocuments);

      console.log(`✔ ${restaurant.name} menu inserted`);
    }

    console.log("Database Seeded Successfully!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(seedDatabase);