const express = require("express");
const { createPayment, verifyPayment } = require("../controllers/paymentController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/create",authMiddleware,createPayment);
router.post("/post",authMiddleware,verifyPayment);

module.exports=router;


