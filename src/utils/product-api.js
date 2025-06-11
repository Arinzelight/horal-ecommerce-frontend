import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
    },
})

export const getProducts = async (params = {}) => {
    try {
        const response = await api.get("product/", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

