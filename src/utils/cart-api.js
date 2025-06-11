import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const addToCart = async (cartItem) => {
  try {
    
    const response = await api.post("cart/add/", cartItem);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async () => {
    try {
        const response = await api.get("cart/");
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
};
