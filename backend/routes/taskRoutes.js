const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.params.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add task
router.post("/", async (req, res) => {
  try {
    const { title, end_date, user_id } = req.body;

    const task = await Task.create({ title, end_date, user_id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Toggle completed
router.put("/:taskId/toggle", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete task
router.delete("/:taskId", async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.taskId } });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;