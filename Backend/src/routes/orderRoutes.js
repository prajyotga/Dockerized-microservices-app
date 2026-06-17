const express = require("express");
const router = express.Router();

const {createOrder,getAllOrder,getOrderById } = require("../controllers/orderController.js");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/",authMiddleware,createOrder);
router.get("/",authMiddleware,getAllOrder);
router.get("/:id",authMiddleware,getOrderById);

module.exports = router;
