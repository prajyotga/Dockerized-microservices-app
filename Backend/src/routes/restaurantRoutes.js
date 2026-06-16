const express=require("express");
const router= express.Router();
const {createRestaurant,getRestaurants,getRestaurantById}=require("../controllers/restaurantController");
const authMiddleware =
  require("../middlewares/authMiddleware");

router.post("/",authMiddleware,createRestaurant);
router.get("/",getRestaurants);
router.get("/:id",getRestaurantById);
module.exports=router;