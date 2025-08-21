import axios from "axios";
import { isTokenExpired } from "../middlewares/checkTokenExpiry";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let onForceLogout = null;

/**
 * Register a Redux-aware logout handler (called from store.js)
 */
export const setForceLogoutHandler = (handler) => {
  onForceLogout = handler;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

/**
 * Get tokens
 */
const getAccessToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const getRefreshToken = () => localStorage.getItem("refreshToken");

/**
 * Save tokens
 */
export const saveTokens = (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem("token", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

/**
 * Force logout → clears storage + redux
 */
export const forceLogout = () => {
  // clear storage
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("wishlist");
  localStorage.removeItem("persist:root");

  // notify redux
  if (onForceLogout) {
    onForceLogout();
  }

  // redirect
  window.location.href = "/signin";
};

/**
 * Refresh token
 */
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(
    `${API_BASE_URL}/user/token/refresh/`,
    { refresh: refreshToken },
    { withCredentials: true }
  );

  const { access: newAccessToken, refresh: newRefreshToken } = response.data;
  saveTokens(newAccessToken, newRefreshToken);
  return newAccessToken;
};

/**
 * Request Interceptor
 */
api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshAccessToken();
          token = newAccessToken;
          processQueue(null, newAccessToken);
        } catch (err) {
          processQueue(err, null);
          forceLogout();
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
          reject,
        });
      });
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          const newAccessToken = await refreshAccessToken();
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return api(error.config);
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken) => {
              error.config.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(error.config));
            },
            reject,
          });
        });
      } catch (err) {
        processQueue(err, null);
        forceLogout();
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      console.warn("Access denied (403)");
      forceLogout();
    }

    return Promise.reject(error);
  }
);

export default api;
