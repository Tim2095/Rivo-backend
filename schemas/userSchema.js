const Joi = require('joi')

const userSchema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    "string.empty": "The first name field is empty",
    "string.min": "First name must be at least 2 characters long"
  }),
  secondname: Joi.string().min(2).required().messages({
    "string.empty": "The second name field is empty",
    "string.min": "Second name must be at least 2 characters long"
  }),
  age: Joi.number().min(18).required().messages({
    "number.base": "The age field is empty or not a number",
    "number.min": "Age must be at least 18"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "The email field is empty",
    "string.email": "The email is not valid"
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "The password field is empty",
    "string.min": "Password must be at least 8 characters long"
  }),
  tasks: Joi.array().items(Joi.string()).optional(), // Optional tasks array
});

module.exports = userSchema;