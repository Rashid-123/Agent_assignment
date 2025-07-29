import express from "express";
import { addAgent , getAllAgents , getSingleAgent } from "../controllers/agentController.js";

import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add", protect, addAgent);
router.get("/all", protect, getAllAgents);
router.get("/:id", protect, getSingleAgent);

export default router;