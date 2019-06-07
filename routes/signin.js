const express = require('express')
const User = require('../models/User')
const UserSession = require('../models/UserSession')
const bodyParser = require('body-parser')

const signin = express.Router()
signin.use(bodyParser.json())

signin.route('/signin').post((req, res) => {
  const { body } = req
  const { email, password } = body
  console.log(email, password)
  if (!email || !password) {
    return res.send({ success: false, message: 'Something is wrong' })
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.send({ success: false, message: 'Server Error' })
    }
    if (!user) {
      return res.send({ success: false, message: 'Invalid Details' })
    }

    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Email or Password incorrect'
      })
    }

    var userSession = new UserSession()
    userSession.userId = user._id
    userSession.save((err, session) => {
      if (err) {
        return res.send({ success: false, message: 'Server Error' })
      }
      return res.send({
        success: true,
        message: 'Successful',
        token: session._id
      })
    })
  })
})

signin.route('/signup').post((req, res) => {
  const { body } = req
  const { name, email, password } = body
  console.log(name, email, password)
  if (!name) {
    return res.send({ success: false, message: 'Name missing' })
  }
  if (!email) {
    return res.send({ success: false, message: 'Email missing' })
  }
  if (!password) {
    return res.send({ success: false, message: 'Password missing' })
  }

  User.findOne({ email: email }, (err, prevUser) => {
    if (err) {
      return res.send({ message: 'Server error' })
    } else if (prevUser) {
      return res.send({ message: 'User already exists' })
    } else {
      const newUser = new User()
      newUser.name = name
      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.save((err, user) => {
        if (err) {
          return res.send({ message: 'Server error' })
        }
        return res.send({ success: true, message: 'Signed Up' })
      })
    }
  })
})

signin.route('/verify').get((req, res) => {
  const { query } = req
  const { token } = query
  UserSession.findOne({ _id: token, isDeleted: false }, (err, session) => {
    if (err) {
      return res.send({ message: 'Server Error' })
    }
    if (!session) {
      return res.send({ message: 'Invalid' })
    }
    return res.send({ message: 'Session Verified' })
  })
})

signin.route('/logout').get((req, res) => {
  const { query } = req
  const { token } = query
  UserSession.findOneAndUpdate(
    { _id: token, isDeleted: false },
    { $set: { isDeleted: true } },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({ message: 'Server Error' })
      }
      return res.send({ message: 'Logged Out!!' })
    }
  )
})

module.exports = signin
