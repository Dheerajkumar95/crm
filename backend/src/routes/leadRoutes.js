import express from "express";
import {
  createLead,
  getLeads,
  convertLeads,
} from "../controllers/leadController.js";
const router = express.Router();
router.post("/", createLead);
router.get("/", getLeads);
router.post("/convert", convertLeads);
export default router;
