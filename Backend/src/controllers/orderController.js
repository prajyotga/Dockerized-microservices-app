const orderService = require("../services/orderService");

// --------create an order for this logged in user


const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user.id);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all the orders of the looged in user

const getAllOrder = async (req, res) => {
  try {
    const orders = await orderService.getAllOrder(req.user.id);

    res.status(200).json({
      success: true,
      message: "All orders are listed",
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Order Found",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order =
      await orderService.updateOrderStatus(
        req.params.id,
        status
      );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {createOrder,getAllOrder,getOrderById,updateOrderStatus};
