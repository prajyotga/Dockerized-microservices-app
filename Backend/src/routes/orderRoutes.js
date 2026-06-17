const express = require("express");
const router = express.Router();

const createOrder  = require("../controllers/orderController.js");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/",authMiddleware,createOrder);

module.exports = router;
