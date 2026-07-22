const express= require("express");
const router=express.Router();
const{createMenu,getMenu}=require("../controllers/menuController");


router.post("/",createMenu);
router.get("/:restaurantId",getMenu);

module.exports=router;