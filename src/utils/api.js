import axios from "axios";
import { isTokenExpired } from "../middlewares/checkTokenExpiry";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(
            `${API_BASE_URL}/user/token/refresh`,
            { refreshToken }
          );

          const newAccessToken = response.data.accessToken;
          localStorage.setItem("token", newAccessToken);
          token = newAccessToken;
          processQueue(null, newAccessToken);
        } catch (err) {
          processQueue(err, null);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken) => {
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          },
          reject: (err) => reject(err),
        });
      });
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Bearer token attached:", token);
    } else {
      console.warn("⚠️ No token found in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("🚫 Unauthorized, redirecting to login...");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default api;
