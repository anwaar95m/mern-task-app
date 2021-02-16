/** @format */

const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (validator.isDivisibleBy(value, 1)) {
        throw new Error("Description should be a valid string");
      }
    },
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
