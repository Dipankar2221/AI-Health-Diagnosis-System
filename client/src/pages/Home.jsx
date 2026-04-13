import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* ✅ Hero Section with Background Image */}
      <div
        className="relative h-[90vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold flex justify-center items-center gap-2">
            <FavoriteIcon fontSize="large" />
            AI Health Diagnosis System
          </h1>

          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Predict diseases early and stay healthy with AI-powered insights,
            smart recommendations, and real-time reports.
          </p>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link
              to="/signup"
              className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Features Section */}
      <div className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose Our AI System?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">Multi-Disease Prediction</h3>
            <p className="text-sm mt-2 text-gray-600">
              Predict Heart, Stroke, Diabetes, Kidney, and Liver diseases using
              advanced AI models.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">AI Recommendations</h3>
            <p className="text-sm mt-2 text-gray-600">
              Get personalized diet plans, exercise tips, and lifestyle guidance
              instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">Real-Time Reports</h3>
            <p className="text-sm mt-2 text-gray-600">
              Generate downloadable reports and monitor your health over time.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Extra CTA Section */}
      <div className="bg-blue-600 text-white text-center py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Start Your Health Journey Today
        </h2>
        <p className="mt-3">
          Join now and take control of your health using AI technology.
        </p>

        <Link
          to="/signup"
          className="mt-5 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Home;