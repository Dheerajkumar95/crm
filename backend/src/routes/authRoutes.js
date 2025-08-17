import express from "express";
import { login, register } from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/check", protect, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});
router.get("/profile", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
