import { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
//Creates a global state, stores data, keeps data on reload, handles API req

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //Provider of cart state to app
  const [cart, setCart] = useState([]);
  //Store cart as an array

  const fetchCart = async () => {
    //READ
    try {
      const response = await axiosInstance.get("/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item) => {
    //CREATE
    try {
      const response = await axiosInstance.post("/api/cart", item);

      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) => cartItem.name === response.data.name,
        );
        //Avoids dupes

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

  useEffect(() => {
    fetchCart();
  }, []);
  //Runs on load

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
