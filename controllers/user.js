const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userSchema = require("../schemas/userSchema");

userRouter.post("/", async (req, res, next) => {
  try {
    const { firstname, secondname, age, email, tasks, password } = req.body;

    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      error.name = 'ValidationError'
      return next(error)
    }

    const saltRounds = 10;
    let passwordHash;
    try {
      passwordHash = await bcrypt.hash(password, saltRounds);
    } catch (err) {
      err.statusCode = 500;
      err.message = "Error occured while hashing the password";
      return next(err);
    }

    const user = new User({
      firstname,
      secondname,
      age,
      email,
      tasks,
      passwordHash,
    });

    try {
      const savedUser = await user.save();

      res.status(201).json(savedUser);
    } catch (err) {
      err.statusCode = 500;
      err.message = "Error saving user to database";
    }
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
