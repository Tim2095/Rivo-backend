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
    const title = req.body.title;
    const description = req.body.description;

    if (!description || !title) {
      const error = new Error("Task and Title fields are reqired");
      error.statusCode = 400;
      return next(error);
    }
    const token = getTokenFrom(req);
    if (!token) {
      const error = new Error("Missing or invalid token");
      error.statusCode = 401;
      return next(error);
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      const error = new Error("Invalid token");
      error.statusCode = 401;
      return next(error);
    }

    const user = await User.findById(decodedToken.id);

    const newTask = {
      title,
      description,
      dateCreated: new Date(),
      completed: false,
    };

    user.tasks.push(newTask);

    await user.save();

    res.status(201).json({ message: "Task added successfully", user });
  } catch (err) {
    next(err);
  }
});

taskRouter.patch("/complete", async (req, res, next) => {
  try {
    const { taskId, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const currentTask = user.tasks.find((task) => task.id === taskId);
    if (!currentTask) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    if (currentTask) {
      currentTask.completed = true;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = taskRouter;
