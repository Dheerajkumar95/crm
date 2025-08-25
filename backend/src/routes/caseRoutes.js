import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  deleteCase,
  getCaseId,
} from "../controllers/caseController.js";

const router = express.Router();

// Routes
router.post("/", protect, createCase);
router.get("/", getCases);
router.get("/:id", getCaseById);
router.put("/:id", updateCase);
router.delete("/:id", deleteCase);
router.get("/account/:accountId", getCaseId);
export default router;
