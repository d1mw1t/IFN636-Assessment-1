const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCartItems);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
