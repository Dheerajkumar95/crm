import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addActivitys,
  getActivitiesByOpportunitiesId,
  deleteActivitys,
} from "../controllers/oppActivitiesController.js";

const router = express.Router();

router.post("/", protect, addActivitys);
router.get("/:Id", getActivitiesByOpportunitiesId);
router.delete("/:id", deleteActivitys);
export default router;
