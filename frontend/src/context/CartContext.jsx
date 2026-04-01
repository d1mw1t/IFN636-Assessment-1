import { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await axiosInstance.post("/api/cart", item);

      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) => cartItem.name === response.data.name,
        );

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

  // Updates the quantity of an existing cart item in the database and local state
  const updateCartItem = async (id, quantity) => {
    try {
      // Sends the new quantity to the backend for the selected item
      const response = await axiosInstance.put(`/api/cart/${id}`, { quantity });

      // Replaces the old item in state with the updated item from the backend
      setCart((prevCart) =>
        prevCart.map((item) => (item._id === id ? response.data : item)),
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Deletes the selected cart item from the database and removes it from local state
  const deleteCartItem = async (id) => {
    try {
      // Sends delete request to backend using the item's id
      await axiosInstance.delete(`/api/cart/${id}`);

      // Removes the deleted item from the current cart state
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, updateCartItem, deleteCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
