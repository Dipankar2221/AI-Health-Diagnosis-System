import express from "express";
import { sendMessage } from "../controllers/chatbotController.js";


const router = express.Router();

// Protected chatbot route
router.post("/", sendMessage);

export default router;