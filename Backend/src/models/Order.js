const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Out For Delivery", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("Order", orderSchema);
