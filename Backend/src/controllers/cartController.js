const cartService = require("../services/cartService");

// Add Item
const addCart = async (req, res) => {
  try {
    const { menuItemId } = req.body;

    const cart = await cartService.addCart(
      req.user.id,
      menuItemId
    );

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);

    res.status(200).json({
      success: true,
      message: "All cart items",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Item
const removeCart = async (req, res) => {
  try {
    const cart = await cartService.removeCart(
      req.user.id,
      req.params.menuItemId
    );

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Increase Quantity
const increaseQuantity = async (req, res) => {
  try {
    const cart = await cartService.increaseQuantity(
      req.user.id,
      req.params.menuItemId
    );

    res.status(200).json({
      success: true,
      message: "Quantity Increased",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Decrease Quantity
const decreaseQuantity = async (req, res) => {
  try {
    const cart = await cartService.decreaseQuantity(
      req.user.id,
      req.params.menuItemId
    );

    res.status(200).json({
      success: true,
      message: "Quantity Updated",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCart,
  getCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
};