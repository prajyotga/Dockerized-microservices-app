const express = require("express");
const router = express.Router();

const {
  getCart,
  addCart,
  removeCart,
} = require("../controllers/cartController.js");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, addCart);
router.get("/", authMiddleware, getCart);
router.delete("/:menuItemId", authMiddleware, removeCart);

module.exports = router;
