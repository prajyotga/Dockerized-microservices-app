const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const result = await paymentService.verifyPayment(req);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};