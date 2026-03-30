const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartItem,
} = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCartItems);
router.put("/:id", updateCartItem);

module.exports = router;
