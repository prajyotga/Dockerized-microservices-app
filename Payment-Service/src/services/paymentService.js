const crypto = require("crypto");

const razorpay = require("../config/razorpay");
const paymentRepository = require("../repositories/paymentRepository");

// Create Razorpay Order
const createPayment = async (req) => {
  const { orderId } = req.body;

  const order =
    await paymentRepository.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const options = {
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  const razorPayOrder =
    await razorpay.orders.create(options);

  await paymentRepository.updatePayment(orderId, {
    razorpayOrderId: razorPayOrder.id,
  });

  return {
    success: true,
    message: "Razorpay order created",
    razorPayOrder,
  };
};

// Verify Razorpay Payment
const verifyPayment = async (req) => {
  const {
    orderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(
      razorpay_order_id + "|" + razorpay_payment_id
    )
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }

  await paymentRepository.updatePayment(orderId, {
    paymentStatus: "Paid",
    paymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    status: "Preparing",
  });

  return {
    success: true,
    message: "Payment verified successfully",
  };
};

module.exports = {
  createPayment,
  verifyPayment,
};