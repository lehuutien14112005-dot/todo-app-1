const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  done: { type: Boolean, default: false },
  doneAt: Date
});

module.exports = mongoose.model("Task", taskSchema);
