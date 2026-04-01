const mongoose = require("mongoose"); //Import mongoose library

const cartItemSchema = new mongoose.Schema(
  {
    //Links cart item to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //Name req
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //Category req
    category: {
      type: String,
      required: true,
      trim: true,
    },
    //Price req
    price: {
      type: Number,
      required: true,
    },
    //Image req
    image: {
      type: String,
      default: "",
    },
    //Qty req
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1, //Must be at least 1
    },
  },
  {
    timestamps: true, //Allows for created and updated at
  },
);

module.exports = mongoose.model("CartItem", cartItemSchema); //Creates a model. used by find()
