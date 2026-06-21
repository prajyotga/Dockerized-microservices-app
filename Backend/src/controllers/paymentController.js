const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

//create instance of razorpay

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const dbOrder = await Order.findById(orderId);

    if (!dbOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: dbOrder.totalAmount * 100,
      currency: "INR",
      receipt: "receipt" + Date.now(),
    };

    const razorPayOrder = await razorpay.orders.create(options);

    dbOrder.razorpayOrderId = razorPayOrder.id;

    await dbOrder.save();

    res.status(200).json({
      success: true,
      message: "Order placed succesfully",
      razorPayOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Payment Creation Failed",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature == razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: "Paid",
          paymentId: razorpay_payment_id,
          status: "Preparing",
        },
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment Verification Failed",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyPayment, createPayment };
