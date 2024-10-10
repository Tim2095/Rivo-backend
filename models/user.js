const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dateCreated: {type: String},
  completed: { type: Boolean, required: true }
});


const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  email: {
    type: String,
    require: true,
    unique: true
  },
  passwordHash: String,
  tasks: [taskSchema],
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash
  },
});

module.exports = mongoose.model('User', userSchema)