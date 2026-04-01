import { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
// global cart state + api calls

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // wraps app

  const [cart, setCart] = useState([]);
  // cart array

  const fetchCart = async () => {
    // READ
    try {
      const response = await axiosInstance.get("/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item) => {
    // CREATE
    try {
      const response = await axiosInstance.post("/api/cart", item);

      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) => cartItem.name === response.data.name,
        );
        // check if already in cart

        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = response.data;
          return updatedCart;
        }

        return [...prevCart, response.data];
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateCartItem = async (id, quantity) => {
    // UPDATE
    try {
      const response = await axiosInstance.put(`/api/cart/${id}`, {
        quantity,
      });

      setCart((prevCart) =>
        prevCart.map((item) => (item._id === id ? response.data : item)),
      );
      // replace updated item
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const deleteCartItem = async (id) => {
    // DELETE
    try {
      await axiosInstance.delete(`/api/cart/${id}`);

      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
      // remove from state
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  // run once on load

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
