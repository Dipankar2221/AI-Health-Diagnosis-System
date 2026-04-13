import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Chatbot from "./pages/Chatbot";

// Prediction Pages
import Heart from "./pages/Predict/Heart";
import Stroke from "./pages/Predict/Stroke";
import Diabetes from "./pages/Predict/Diabetes";
import Kidney from "./pages/Predict/Kidney";
import Liver from "./pages/Predict/Liver";

// 404 Page (optional)
const NotFound = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />

      {/* Prediction Routes */}
      <Route
        path="/predict/heart"
        element={
          <ProtectedRoute>
            <Heart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predict/stroke"
        element={
          <ProtectedRoute>
            <Stroke />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predict/diabetes"
        element={
          <ProtectedRoute>
            <Diabetes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predict/kidney"
        element={
          <ProtectedRoute>
            <Kidney />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predict/liver"
        element={
          <ProtectedRoute>
            <Liver />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;