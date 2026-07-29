const Order = require("../models/Order");

// Find cart by user id
const axios = require("axios");


// Find Cart by User Id
const findCartByUserId = async (userId) => {

  const response = await axios.get(
    `${process.env.CART_SERVICE}/api/cart`,
    {
      headers: {
        "x-user-id": userId,
      },
    }
  );

  return response.data.cart;
};


const clearCart = async (userId) => {
  await axios.delete(
    `${process.env.CART_SERVICE}/api/cart/clear`,
    {
      headers: {
        "x-user-id": userId,
      },
    }
  );
};
// Create Order
const createOrder = async (orderData) => {
  return await Order.create(orderData);
};




// Get all orders
const getOrdersByUserId = async (userId) => {
  return await Order.find({
    userId,
  })
    
    .sort({ createdAt: -1 });
};

// Get order by id
const getOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

// Update status
const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
};

const updatePayment = async (
  orderId,
  paymentData
) => {
  return await Order.findByIdAndUpdate(
    orderId,
    paymentData,
    { new: true }
  );
};

module.exports = {
  findCartByUserId,
  createOrder,
 
  getOrdersByUserId,
  getOrderById,
  updatePayment,
  updateOrderStatus,
  clearCart
};