import express from "express";
import logger from "../utils/logger.js";

const router = express.Router();

// ---------------- ML SERVER ----------------
const BASE_URL = process.env.ML_API_URL || "http://127.0.0.1:5001";

// ---------------- COMMON FUNCTION ----------------
const callMLAPI = async (endpoint, data) => {
  try {
    logger.info(`➡️ Sending request to ML: ${endpoint}`);

    const response = await fetch(BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    logger.info(`⬅️ Response from ML: ${endpoint} | Status: ${response.status}`);

    const result = await response.json();

    logger.info(`✅ ML Result: ${JSON.stringify(result)}`);

    return result;

  } catch (error) {
    logger.error(`❌ ML ERROR (${endpoint}): ${error.message}`);
    throw error;
  }
};

// ---------------- ENDPOINTS ----------------
const endpoints = {
  heart: "/heart",
  diabetes: "/diabetes",
  stroke: "/stroke",
  kidney: "/kidney",
  liver: "/liver"
};

// ❤️ HEART
router.post("/heart", async (req, res) => {
  logger.info("🔥 API HIT: /predict/heart");
  const data = await callMLAPI(endpoints.heart, req.body);
  res.json(data);
});

// 🩸 DIABETES
router.post("/diabetes", async (req, res) => {
  logger.info("🔥 API HIT: /predict/diabetes");
  const data = await callMLAPI(endpoints.diabetes, req.body);
  res.json(data);
});

// 🧠 STROKE
router.post("/stroke", async (req, res) => {
  logger.info("🔥 API HIT: /predict/stroke");
  const data = await callMLAPI(endpoints.stroke, req.body);
  res.json(data);
});

// 🧪 KIDNEY
router.post("/kidney", async (req, res) => {
  logger.info("🔥 API HIT: /predict/kidney");
  const data = await callMLAPI(endpoints.kidney, req.body);
  res.json(data);
});

// 🧬 LIVER
router.post("/liver", async (req, res) => {
  logger.info("🔥 API HIT: /predict/liver");
  const data = await callMLAPI(endpoints.liver, req.body);
  res.json(data);
});

// 🔥 ALL-IN-ONE
router.post("/all", async (req, res) => {
  logger.info("🔥 API HIT: /predict/all");

  const results = {};

  for (const key in endpoints) {
    try {
      results[key] = await callMLAPI(endpoints[key], req.body);
    } catch {
      results[key] = { error: "Service not reachable" };
    }
  }

  res.json({
    success: true,
    results
  });
});

export default router;