import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let onForceLogout = null;
let csrfInitialized = false;

// Register a Redux-aware logout handler
export const setForceLogoutHandler = (handler) => {
  onForceLogout = handler;
};

// Process queued requests after token refresh
const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

// Force logout → clears storage & redirects
export const forceLogout = () => {
  localStorage.removeItem("persist:root");
  if (onForceLogout) onForceLogout();
  window.location.href = "/signin";
};

// Refresh access token using cookie-based refresh token
const refreshAccessToken = async () => {
  try {
    await api.post("user/token/refresh/");
  } catch (err) {
    throw new Error("Failed to refresh access token");
  }
};

// Read a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Fetch CSRF token from backend if not already in cookies
export async function ensureCsrfToken() {
  let csrfToken = getCookie("csrftoken");

  if (!csrfToken || !csrfInitialized) {
    try {
      // This endpoint should set csrftoken cookie via Set-Cookie header
      await api.get("user/get-csrf-token/");
      csrfToken = getCookie("csrftoken");
      csrfInitialized = true;
    } catch (err) {
      console.error("Failed to fetch CSRF token", err);
    }
  }

  return csrfToken;
}

// Request interceptor → attach CSRF token automatically for unsafe requests
api.interceptors.request.use(
  async (config) => {
    if (["post", "put", "patch", "delete"].includes(config.method)) {
      const csrfToken = await ensureCsrfToken();
      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
    }

    // If refreshing, queue request
    if (!isRefreshing) return config;

    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 401 (refresh) & 403 (force logout)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    // Token expired → try refresh
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await refreshAccessToken();
          processQueue(null);
          return api(error.config); // retry original request
        } catch (err) {
          processQueue(err);
          forceLogout();
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(error.config)),
          reject,
        });
      });
    }

    // Forbidden → likely bad/missing CSRF → force logout
    // if (status === 403) {
    //   forceLogout();
    // }

    return Promise.reject(error);
  }
);

export default api;
