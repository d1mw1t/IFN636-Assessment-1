import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function GroceryPage() {
  const { cart, addToCart } = useContext(CartContext);

  const handleAdd = (item) => {
    const cartItem = {
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  const items = [
    { id: 1, name: "Grain Waves - Sweet Chilli", price: 3.33 },
    { id: 2, name: "Chicken Schnitzel", price: 6.54 },
    { id: 3, name: "Quest Protein Cookie", price: 2.22 },
  ];

  return (
    <div>
      <h1>Grocery Store</h1>

      {items.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - ${item.price}
          </p>
          <button onClick={() => handleAdd(item)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - ${item.price} x {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GroceryPage;
