// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Task = require("../models/Task");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hashed });
    res.json({ msg: "User registered" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const tasks = await Task.findAll({ where: { UserId: user.id } });
    res.json({ userId: user.id, tasks }); // important: send userId for frontend
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;