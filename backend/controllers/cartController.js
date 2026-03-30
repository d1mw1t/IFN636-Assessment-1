const CartItem = require("../models/CartItem");

const addToCart = async (req, res) => {
  try {
    const { name, category, price, image, quantity } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingItem = await CartItem.findOne({ name });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem);
    }

    const newItem = new CartItem({
      name,
      category,
      price,
      image,
      quantity: quantity || 1,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    const updatedItem = await cartItem.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.deleteOne();

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
