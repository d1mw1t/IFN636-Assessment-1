const express = require("express");
const router = express.Router();

const { addToCart, getCartItems } = require("../controllers/cartController");

router.post("/", addToCart);
router.get("/", getCartItems);

module.exports = router;
