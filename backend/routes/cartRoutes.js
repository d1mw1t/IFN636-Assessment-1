const express = require("express"); //Import express framework
const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController"); //Import controller functions

router.post("/", addToCart); //CREATE
router.get("/", getCartItems); //READ
router.put("/:id", updateCartItem); //UPDATE
router.delete("/:id", deleteCartItem); //DELETE

module.exports = router; //Makes avalible to server
