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

module.exports = { addToCart };
