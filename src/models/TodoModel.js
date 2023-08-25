const mongoose = require("mongoose");

const ToDoSchema = mongoose.Schema(
  {
    title: String,
    about: String,
    catagery: String,
    important: Boolean,
  },
  { timestamps: true }
);

const ToDoModel = mongoose.model("todos", ToDoSchema);
module.exports = ToDoModel;
