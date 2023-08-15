const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ToDoModel = require("./src/models/TodoModel");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("connectin successfull..");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/add", (req, res) => {
  const todo = req.body.data;
  ToDoModel.create({
    data: todo,
  })
    .then((result) => {
      console.log(`todo seved 👍 ${result}`);
      res.status(200).send("ToDo has saved...");
    })

    .catch((err) => {
      console.log(`todo not saved 😒 ${err.massege}`);
    });
});

app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
