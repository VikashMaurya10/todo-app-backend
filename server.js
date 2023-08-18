const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// require("dotenv").config();
const MONGODB_URI =
  "mongodb+srv://vikashmauryastp:vikashmaurya@cluster0.718hhza.mongodb.net/";

// import helper files
const Database = require("./src/helpers/database");
const ResponseHandler = require("./src/helpers/responseHandler");

// import models
const ToDoModel = require("./src/models/TodoModel");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);
app.use(express.json());

const port = 5000;

// connect to database
Database();

// add a todo in database
app.post("/add", (req, res) => {
  const todo = req.body.data;
  if (todo.trim().length > 0) {
    ToDoModel.create({
      data: todo,
    })
      .then((result) => {
        console.log(`todo saved 👍`);
        res.status(200).send("ToDo has been saved...");
      })
      .catch((err) => {
        console.log(`todo not saved 😒 ${err.message}`);
        res.status(500).send("Error saving ToDo.");
      });
  } else {
    console.log("Todo is empty🐛");
  }
});

// get all list of todos
app.get("/list-todos", async (req, res) => {
  try {
    const items = await ToDoModel.find({});
    ResponseHandler.successResponse(res, items);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const todo_id = req.params.id;
  console.log(todo_id);

  const deleteTodo = await ToDoModel.findByIdAndDelete(todo_id);

  if (deleteTodo) {
    ResponseHandler.successResponse(res, "TO do deleted");
  } else {
  }
});

// start server to serve
app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
