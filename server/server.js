import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// 🔍 ML CHECK
const checkMLServer = async () => {
  try {
    logger.info("🔍 Checking ML Server...");
    const res = await fetch(process.env.ML_API_URL);

    if (res.ok) {
      logger.info("✅ ML Server Connected");
    } else {
      logger.warn("⚠️ ML Server responded but not OK");
    }

  } catch {
    logger.error("❌ ML Server NOT reachable. Start Python server!");
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await checkMLServer();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    logger.error(err.message);
  }
};

startServer();