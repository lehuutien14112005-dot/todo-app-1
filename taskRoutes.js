const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const router = express.Router();

// 1️⃣ getAllTasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().populate("user");
  res.json(tasks);
});

// 2️⃣ Lấy task theo username
router.get("/user/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const tasks = await Task.find({ user: user._id });
  res.json(tasks);
});

// 3️⃣ Task hôm nay
router.get("/today", async (req, res) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const tasks = await Task.find({ createdAt: { $gte: today } });
  res.json(tasks);
});

// 4️⃣ Task chưa hoàn thành
router.get("/notdone", async (req, res) => {
  const tasks = await Task.find({ done: false });
  res.json(tasks);
});

// 5️⃣ Task của user họ Nguyễn
router.get("/nguyen", async (req, res) => {
  const users = await User.find({ fullname: /Nguyễn/i });
  const ids = users.map(u => u._id);
  const tasks = await Task.find({ user: { $in: ids } });
  res.json(tasks);
});

// Tạo task
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

module.exports = router;
