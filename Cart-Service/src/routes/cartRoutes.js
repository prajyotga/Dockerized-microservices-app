const express = require("express");
const router = express.Router();

const {
  getCart,
  addCart,
  removeCart,
  decreaseQuantity,
  increaseQuantity
} = require("../controllers/cartController.js");


router.post("/add", addCart);
router.get("/", getCart);
router.delete("/:menuItemId", removeCart);
router.patch("/increase/:menuItemId", increaseQuantity);
router.patch("/decrease/:menuItemId", decreaseQuantity);

module.exports = router;
