import { createContext, useState } from "react";
import axiosInstance from "../axiosConfig";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    try {
      const response = await axiosInstance.post("/cart", item);
      setCart([...cart, response.data]);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
