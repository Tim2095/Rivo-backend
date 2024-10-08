const taskRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

taskRouter.post("/", async (req, res, next) => {
  try {
    const title = req.body.taskTitle;
    const description = req.body.description;

    if (!description || !title) {
      const error = new Error("Task and Title fields are reqired");
      error.statusCode = 400;
      return next(error);
    }
    const token = getTokenFrom(req);
    if (!token) {
      const error = new Error('Missing or invalid token')
      error.statusCode = 401 
      return next(error)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id) {
      const error = new Error('Invalid token')
      error.statusCode = 401 
      return next(error)
    }
  } catch (err) {
    next(err)
  }
});

module.exports = taskRouter;
