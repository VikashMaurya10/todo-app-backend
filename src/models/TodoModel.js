const mongoose = require("mongoose");

const ToDoSchema = mongoose.Schema({
  data: String,
});

const ToDoModel = mongoose.model("todos", ToDoSchema);
module.exports = ToDoModel;
