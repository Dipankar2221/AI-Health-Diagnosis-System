import express from "express";
import cors from "cors";
import path from "path";

// Routes
import authRoutes from "./routes/authRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

// Middleware
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- STATIC ----------------
app.use("/uploads", express.static(path.join(process.cwd(),"uploads")));

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictionRoutes);   // ML calls
app.use("/api/reports", reportRoutes);       // reports + dashboard
app.use("/api/chatbot", chatbotRoutes);

// ---------------- TEST ----------------
app.get("/", (req, res) => {
  res.send("🚀 AI Health API Running...");
});

// ---------------- ERROR ----------------
app.use(errorMiddleware);

export default app;