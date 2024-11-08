const express = require("express");
const app = express();
const cors = require("cors");
const userController = require("./controllers/user");
const loginController = require("./controllers/login");
const taskController = require("./controllers/task");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json());
app.use(cors());

// MongoDB connection
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

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(
  "/assets",
  express.static(path.join(__dirname, "dist", "assets"), {
    setHeaders: (res, path) => {
      // Explicitly set Content-Type for .js files
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
      // Optional: set for .css files if needed
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// API Routes
app.use("/api/user", userController);
app.use("/api/login", loginController);
app.use("/api/new-task", taskController);

// Serve static files from 'dist' directly without '/api' path

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (err.name === "ValidationError") {
    const errorMessage = err.details.map((detail) => detail.message).join(", ");
    return res.status(400).json({ message: errorMessage });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal server Error" });
});

module.exports = app;
