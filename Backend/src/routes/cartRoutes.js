const express = require("express");
const router = express.Router();

const {
  getCart,
  addCart,
  removeCart,
  decreaseQuantity,
  increaseQuantity
} = require("../controllers/cartController.js");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, addCart);
router.get("/", authMiddleware, getCart);
router.delete("/:menuItemId", authMiddleware, removeCart);
router.patch("/increase/:menuItemId", authMiddleware, increaseQuantity);
router.patch("/decrease/:menuItemId", authMiddleware, decreaseQuantity);

module.exports = router;
