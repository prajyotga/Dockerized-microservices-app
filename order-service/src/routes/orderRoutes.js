const express = require("express");
const router = express.Router();

const {createOrder,getAllOrder,getOrderById,updateOrderStatus,updatePayment } = require("../controllers/orderController.js");


router.post("/", createOrder);
router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);
router.put("/:id/payment", updatePayment);

module.exports = router;
