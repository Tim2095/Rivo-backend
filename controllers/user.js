const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  try {
    const { firstname, secondname, age, email, tasks, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstname,
      secondname,
      age,
      email,
      tasks,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.send(err);
  }
});

module.exports = userRouter;
