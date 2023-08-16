const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

const port = process.env.PORT || 5000;

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("connection successful..");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/add", (req, res) => {
  const todo = req.body.data;
  console.log(req.body);
  ToDoModel.create({
    data: todo,
  })
    .then((result) => {
      console.log(`todo saved 👍 ${result}`);
      res.status(200).send("ToDo has been saved...");
    })
    .catch((err) => {
      console.log(`todo not saved 😒 ${err.message}`);
      res.status(500).send("Error saving ToDo.");
    });
});

app.get("/add", (req, res) => {
  res.status(200).send("This is a GET endpoint.");
});

app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
