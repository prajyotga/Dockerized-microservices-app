const Menu = require("../models/Menu");
const Cart = require("../models/Cart");

const addCart = async (req, res) => {
  try {
    const { menuItemId } = req.body;

    const menu = await Menu.findById(menuItemId);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const cart = await Cart.create({
        userId,
        items: [
          {
            menuItem: menuItemId,
            quantity: 1,
          },
        ],
      });
    } else {
      const existingItem = cart.items.findOne((item) => {
        item.menuItem.toString() === menuItemId;
      });

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          menuItem: menuItemId,
          quantity: 1,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart
      .findOne({
        userId: req.user.id,
      })
      .populate("items.menuItem");

    res.status(200).json({
      success: true,
      message: "All the items of cart listed",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== req.params.menuItemId,
    );
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { removeCart, addCart, getCart };
