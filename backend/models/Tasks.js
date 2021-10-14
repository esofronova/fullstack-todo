const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
   task: { type: String },
   isDone: {
      type: Boolean,
      default: false
   },
   date: {
      type: Date,
      default: Date.now()
   }
});

// Model
const Task = mongoose.model('Tasks', TaskSchema);

module.exports = Task;