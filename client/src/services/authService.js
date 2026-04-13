import API from "./api";

// ===============================
// 🔹 AUTH SERVICES
// ===============================

// Signup
export const signupUser = async (formData) => {
  const response = await API.post("/auth/signup", formData);
  return response.data;
};

// Login
export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data;
};

// Logout (client-side)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get Profile (protected route)
export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};