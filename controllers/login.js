const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      const error = new Error();
      error.statusCode = 401;
      error.message = "Invalid email or password";
      return next(error);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
