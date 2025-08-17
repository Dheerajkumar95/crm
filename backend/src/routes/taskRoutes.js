import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Get tasks by Lead ID
router.get("/:leadId", async (req, res) => {
  try {
    const tasks = await Task.find({ leadId: req.params.leadId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a task
router.post("/", async (req, res) => {
  try {
    const { leadId, content } = req.body;
    const task = new Task({ leadId, content, dueDate: new Date() });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
