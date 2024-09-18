const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginUser = require("express").Router();
const User = require("../models/user");

loginUser.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new Error("Invalid email or password");
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = loginUser;
