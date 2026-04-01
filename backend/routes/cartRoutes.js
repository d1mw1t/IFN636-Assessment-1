const express = require("express"); //Import express framework
const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController"); //Import controller functions
const { protect } = require("../middleware/authMiddleware"); //Import route protection middleware

router.post("/", protect, addToCart); //CREATE (protected)
router.get("/", protect, getCartItems); //READ (protected)
router.put("/:id", protect, updateCartItem); //UPDATE (protected)
router.delete("/:id", protect, deleteCartItem); //DELETE (protected)

module.exports = router; //Makes avalible to server
