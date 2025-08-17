import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addActivity,
  getActivitiesByLead,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/", protect, addActivity);
router.get("/:leadId", getActivitiesByLead);
router.delete("/:id", deleteActivity);
export default router;
