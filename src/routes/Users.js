const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const CONFIG = require('../../config');
const User = require('../models/User')
users.use(cors())

const _jwtKey = CONFIG.jwt_encryption;


users.post('/register', (req, res) => {
  const userData = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    email: req.body.email,
    password: req.body.password,
    cardNumber: req.body.cardNumber
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, _jwtKey, {
            expiresIn: 3600
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], _jwtKey)

  User.findOne({
    where: {
      userId: decoded.userId
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
        res.status(200)
      } else {
        res.status(404)
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.status(403)
      res.send('error: ' + err)
    })
})

module.exports = users
