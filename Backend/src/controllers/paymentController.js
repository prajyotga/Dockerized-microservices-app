const Razorpay = require("razorpay");
const crypto = require("crypto");

//create instance of razorpay

console.log({
  key: process.env.RAZORPAY_KEY_ID,
  secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt" + Date.now(),
    };

    const order = await razorpay.orders.create(
      options
    );

    res.status(200).json({
      success: true,
      message: "Order placed succesfully",
      order,
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

    const generatedSignature = await crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + " | " + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature == razorpay_signature) {
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

module.exports={verifyPayment,createPayment}