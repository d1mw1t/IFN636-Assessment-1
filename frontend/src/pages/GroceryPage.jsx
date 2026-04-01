import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function GroceryPage() {
  const { cart, addToCart, updateCartItem, deleteCartItem } =
    useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdd = (item) => {
    const cartItem = {
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  //Sends logged out users to login before they can add items
  const handleLoginPrompt = () => {
    navigate("/login");
  };

  const handleIncrease = (item) => {
    updateCartItem(item._id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item._id, item.quantity - 1);
    }
  };

  const handleDelete = (id) => {
    deleteCartItem(id);
  };

  const items = [
    {
      id: 1,
      name: "Grain Waves - Sweet Chilli",
      category: "Snacks",
      price: 3.33,
      image:
        "https://cdn0.woolworths.media/content/wowproductimages/large/329430.jpg",
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
    <div className="grocery-page">
      <div className="grocery-header">
        <h1>Groceries"R"Us Sandgate</h1>
        <p>Browse a range of our store products!</p>
      </div>

      <div className="product-grid">
        {items.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} className="product-image" />

            <div className="product-info">
              <p className="product-category">{item.category}</p>
              <h3>{item.name}</h3>
              <p className="product-price">${item.price.toFixed(2)}</p>
            </div>

            {user ? (
              <button
                className="product-button"
                onClick={() => handleAdd(item)}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="product-button login-button"
                onClick={handleLoginPrompt}
              >
                Login to Add
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">No items in cart yet.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-left">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="cart-controls">
                <button onClick={() => handleDecrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item)}>+</button>
                <button
                  className="remove-button"
                  onClick={() => handleDelete(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GroceryPage;
