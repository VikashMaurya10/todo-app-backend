const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import helper files
const Database = require("./src/helpers/database");
const ResponseHandler = require("./src/helpers/responseHandler");

// import models
const ToDoModel = require("./src/models/TodoModel");

// middlewares
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);
app.use(express.json());

// connect to database
Database();

// add a todo in database
app.post("/add", async (req, res) => {
  const { title, about, category, important } = req.body.data;
  console.log(req.body.data);

  if (title.trim().length > 0 && about.trim().length > 0) {
    await ToDoModel.create({
      title: title,
      about: about,
      category: category,
      important: important,
    })
      .then((result) => {
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

// delete a todo by getting ID
app.delete("/delete/:id", async (req, res) => {
  console.log("delete todo");
  const todo_id = req.params.id;
  const deleteTodo = await ToDoModel.findByIdAndDelete(todo_id);
  if (deleteTodo) {
    ResponseHandler.successResponse(res, "TO do deleted 👍");
  } else {
    ResponseHandler.errorResponse(res, "Internal server error");
  }
});

// get todo data by id
app.get("/get/:id", async (req, res) => {
  const todo_id = req.params.id;
  await ToDoModel.findById(todo_id)
    .then((result) => {
      ResponseHandler.successResponse(res, result);
    })
    .catch((error) => {
      ResponseHandler.errorResponse(res, 500);
    });
});

// update a todo by getting id
app.put("/update/", async (req, res) => {
  // app.put("/update/:id", async (req, res) => {
  const todo_id = req.params.id;
  const { important, id } = req.body;
  console.log(req.body);

  await ToDoModel.findByIdAndUpdate(id, { important: important })
    .then(() => {
      ResponseHandler.successResponse(res, "todo update successfully👍");
    })
    .catch(() => {
      ResponseHandler.errorResponse(res, 500);
    });

  // await ToDoModel.updateOne(
  //   { _id: todo_id },
  //   { $set: { data: updated_Todo_data } }
  // )
  //   .then((result) => {
  //     ResponseHandler.successResponse(res, "todo update successfully👍");
  //   })
  //   .catch((error) => {
  //     ResponseHandler.errorResponse(res, 500);
  //   });

  // ToDoModel.findById(todo_id)
  //   .then((existingRecord) => {
  //     existingRecord.data = updated_Todo_data;
  //     return existingRecord.save();
  //   })
  //   .then((updatedRecord) => {
  //     res
  //       .status(200)
  //       .json({
  //         message: "Record updated successfully",
  //         record: updatedRecord,
  //       });
  //   })
  //   .catch((error) => {
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while updating the record" });
  //   });
});

// start server to serve
app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
