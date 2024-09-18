const express = require("express");
const app = express();
const cors = require("cors");
const userController = require("./controllers/user");
const loginController = require("./controllers/login");
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL.replace("<db_password>", dbPassword);

mongoose.set("strictQuery", false);

console.log(`Connecting to ${dbUrl}`);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => console.log("Error connecting to mongo DB", error.message));

app.use("/user/create", userController);
app.use("/login", loginController);

app.use((err, req, res, next) => {
  console.log(err.stack);

  if(err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.details.map(detail => detail.message)
    })
  }

  if(err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  if (err.message === "Invalid email or password") {
    return res.status(401).json({ message: err.message });
  }

  res.status(500).json({
    message: "Internal server Error",
  });
});

module.exports = app;
