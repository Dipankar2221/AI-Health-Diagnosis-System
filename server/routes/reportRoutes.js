import express from "express";
import { getReports, getDashboard, getRecommendation, createAIReport, deleteReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Reports
router.get("/", protect, getReports);
router.delete("/:id", protect, deleteReport);

// 🔹 Dashboard
router.get("/dashboard", protect, getDashboard);
router.post("/ai/recommendation", getRecommendation);
router.post("/ai-report/:disease",protect, createAIReport);

export default router;