const express=require("express");
const route= express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {getProfile}=require("../controllers/userController.js");

route.get("/profile",authMiddleware,getProfile);

module.exports=route;