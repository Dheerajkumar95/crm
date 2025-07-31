// src/routes/accountRoutes.js
import express from "express";
import {
  getAccount,
  getAccountById,
  updateAccountById,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/", getAccount);
router.get("/:id", getAccountById);
router.patch("/:id", updateAccountById);

export default router;
