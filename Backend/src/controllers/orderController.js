const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Menu = require("../models/Menu");

// --------create an order for this logged in user
const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    cart.items.forEach((item) => {
      totalAmount += item.menuItem.price * item.quantity;
    });

    const order = await Order.create({
      userId: req.user.id,
      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    cart.items = [];

    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Get all the orders of the looged in user

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findOne({
      userId: req.user.id,
    }).populate("items.menuItem")
    .sort({ createdAt: -1 });

    if (!orders || orders.length == 0) {
      res.status(400).json({
        success: false,
        message: "No orders placed yet",
      });
    }

    res.status(200).json({
      success: true,
      message: "All orders are listed",
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getOrderById=async(req,res)=>{

try{
  const order= await Order.findById(
    req.params.id,
  ).populate("items.menuItem");

  if(!order){
    res.status(401).json({
      succes:false,
      message:"Order Not found"
    })
  }

  res.status(200).json({
   succes:true,
      message:"Order  found",
      order
  })

}
catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const updateOrderStatus=async (req,res)=>{
  try{
const {status}=req.body;

 const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

res.status(200).json({
  success:true,
  message:"order status updated succesfully",
  order,
})

  }  catch (error) {
   
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
module.exports = {createOrder,getAllOrder,getOrderById,updateOrderStatus};
