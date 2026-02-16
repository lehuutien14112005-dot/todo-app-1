const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS
app.set("view engine", "ejs");

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// HOME
app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.render("tasks", { tasks });
});


// ADD TASK
app.post("/tasks", async (req, res) => {
  await Task.create({ title: req.body.title });
  res.redirect("/");
});


// DONE TASK
app.post("/tasks/done/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    done: true,
    doneAt: new Date()
  });
  res.redirect("/");
});


// ❗ DELETE TASK (QUAN TRỌNG)
app.post("/tasks/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


// RUN SERVER
app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
