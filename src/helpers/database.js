const mongoose = require("mongoose");
require("dotenv").config();

const Database = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = "todo";
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    })
    .then(() => {
      console.log(`Connected to MongoDB database: ${dbName} 👍`);
    })
    .catch((error) => {
      console.log(`err: ${error.message}\nFailed to connect MongoDB🪲`);
    });
};

module.exports = Database;
