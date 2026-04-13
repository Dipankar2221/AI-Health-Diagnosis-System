import axios from "axios";

// Base URL (change if deployed)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Global response error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired or unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;