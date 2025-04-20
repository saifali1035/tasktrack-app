const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false }, // Added done field
  date: { type: Date, default: Date.now }, // Added date field
});

module.exports = mongoose.model('Task', TaskSchema);

