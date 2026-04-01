import React, { useContext } from "react"; //Import react
import { CartContext } from "../context/CartContext";

function GroceryPage() {
  const { cart, addToCart } = useContext(CartContext);

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
