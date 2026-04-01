import React, { useContext } from "react"; //Import react
import { CartContext } from "../context/CartContext";

function GroceryPage() {
  //Gets cart data and cart functions from the global cart context
  const { cart, addToCart, updateCartItem, deleteCartItem } =
    useContext(CartContext);

  const handleAdd = (item) => {
    //Handle items added
    const cartItem = {
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  //Increases the selected cart item's quantity by 1
  const handleIncrease = (item) => {
    updateCartItem(item._id, item.quantity + 1);
  };

  //Decreases the selected cart item's quantity if it is above 1
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item._id, item.quantity - 1);
    }
  };

  //Deletes the selected item from the cart
  const handleDelete = (id) => {
    deleteCartItem(id);
  };

  //Items
  const items = [
    {
      id: 1,
      name: "Grain Waves - Sweet Chilli",
      category: "Snacks",
      price: 3.33,
      image:
        "https://cdn.productimages.coles.com.au/productimages/3/3926679.jpg",
    },
    {
      id: 2,
      name: "Chicken Schnitzel",
      category: "Meat",
      price: 6.54,
      image:
        "https://cdn0.woolworths.media/content/wowproductimages/large/134041.jpg",
    },
    {
      id: 3,
      name: "Quest Protein Cookie",
      category: "Protein Snacks",
      price: 2.22,
      image:
        "https://cdn.productimages.coles.com.au/productimages/3/3926679.jpg",
    },
  ];

  return (
    <div>
      <h1>Groceries"R"Us</h1>

      {items.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - ${item.price}
          </p>
          <button onClick={() => handleAdd(item)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item._id}>
          <p>
            {item.name} - ${item.price} x {item.quantity}
          </p>

          <button onClick={() => handleDecrease(item)}>-</button>
          <button onClick={() => handleIncrease(item)}>+</button>
          <button onClick={() => handleDelete(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default GroceryPage;
