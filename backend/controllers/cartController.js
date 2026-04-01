const CartItem = require("../models/CartItem"); //Import mongoDB model

const addToCart = async (req, res) => {
  //CREATE
  //Create cart logic
  try {
    const { name, category, price, image, quantity } = req.body;
    //Data from frontend

    if (!name || !category || price === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //Makes sure feilds exists and returns error if not

    //Checks if this user already has the item in their own cart
    const existingItem = await CartItem.findOne({
      name,
      user: req.user._id,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem);
    }
    //Adds 1 to qty otherwise sets to default (1)
    //Saves to DB, returns an updated status

    const newItem = new CartItem({
      //Creates a new cart item linked to the logged in user
      user: req.user._id,
      name,
      category,
      price,
      image,
      quantity: quantity || 1,
    });
    //Creates a new cart item
    //This function allows for both new items and increasing item qty

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//Saves the item and replies with either item saved or error1

const getCartItems = async (req, res) => {
  //READ
  try {
    //Finds only the current user's cart items
    const cartItems = await CartItem.find({ user: req.user._id });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Finds and reads cart items. Returns a good or error

const updateCartItem = async (req, res) => {
  //UPDATE
  try {
    const { id } = req.params; //url
    const { quantity } = req.body; //frontend

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    //Handle and invalid input

    //Finds the cart item only if it belongs to the current user
    const cartItem = await CartItem.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    //Handle an item not found

    cartItem.quantity = quantity; // Update the qty

    const updatedItem = await cartItem.save(); //Save the cart
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  //DELETE
  try {
    const { id } = req.params;

    //Finds the cart item only if it belongs to the current user
    const cartItem = await CartItem.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.deleteOne(); //Remove from DB

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message }); //Runtime error handle
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
//Allows routes file to see functions
