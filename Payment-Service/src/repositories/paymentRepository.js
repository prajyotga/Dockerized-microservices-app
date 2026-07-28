const axios = require("axios");

// Get Order By Id
const getOrderById = async (orderId) => {
  const response = await axios.get(
    `${process.env.ORDER_SERVICE}/api/orders/${orderId}`
  );

  return response.data.order;
};

// Update Payment Details
const updatePayment = async (orderId, paymentData) => {
  const response = await axios.put(
    `${process.env.ORDER_SERVICE}/api/orders/${orderId}/payment`,
    paymentData
  );

  return response.data.order;
};

module.exports = {
  getOrderById,
  updatePayment,
};