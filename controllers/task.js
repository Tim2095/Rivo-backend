const taskRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
} 


taskRouter.post('/', async (req, res) => {
  const token = getTokenFrom(req)
  console.log(token)
})

module.exports = taskRouter