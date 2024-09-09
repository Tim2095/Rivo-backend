const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  }, 
  firstname: String,
  secondname: String,
  age: Number,
  email: {
    type: String,
    require: true,
    unique: true
  },
  // passwordHash: String,
  tasks: [{
    title: String,
    description: String,
    completed: Boolean,
  }]
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