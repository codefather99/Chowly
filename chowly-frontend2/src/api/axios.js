import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("chowly_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic error passthrough (extend with toast/logging as needed)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // token expired / unauthorized - could redirect to login here
    }
    return Promise.reject(error);
  }
);

export default api;
