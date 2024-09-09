const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  try {
    const { firstname, secondname, age, email, task } = req.body;

    const newUser = {
      firstname,
      secondname,
      age,
      email,
      task,
    };

    res.send(newUser);

    console.log(firstname, secondname, age, email, task);
  } catch (err) {
    res.send(err);
  }
});

module.exports = userRouter;
