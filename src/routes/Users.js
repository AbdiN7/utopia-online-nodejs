const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CONFIG = require('../../config');
const User = require('../models/User');
const generator = require('random-words');
users.use(cors());

const _jwtKey = CONFIG.jwt_encryption;


users.post('/register', (req, res) => {
  const userData = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    password: req.body.password,
  };
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash;
          User.create(userData)
            .then(user => {
                res.json({ status: user.email + '  --- Registered!' });
            })
            .catch(err => {
                res.send('error: ' + err);
            });
        });
      } else {
          res.json({ error: 'User already exists' });
      }
    })
    .catch(err => {
        res.send('error: ' + err);
    });
});

users.post('/guest', (req, res) => {
  const guestData = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };
  const guestPass = () => {
    let min = Math.ceil(0);
    let max  = Math.floor(50);
    let random = Math.floor( (Math.random() * (max - min)) + min)
    let random2 = Math.floor( (Math.random() * (max - min)) + min)
    let random3 = Math.floor( (Math.random() * (max - min)) + min)
    return (random + generator() + random2 + generator() + random3)
  }
  newPass = guestPass();
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(guest => {
      if (!guest) {
        bcrypt.hash(newPass, 10, (err, hash) => {
            guestData.password = hash;
          User.create(guestData)
            .then(guest => {
                res.json({ id: guest.userId });
            })
            .catch(err => {
                res.send('error: ' + err);
            });
        });
      } else {
          res.json({ error: 'User already exists' });
      }
    })
    .catch(err => {
        res.send('error: ' + err);
    });
});users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, _jwtKey, {
            expiresIn: 1000
          });
            res.send(token);
        }
      } else {
          res.status(400).json({ error: 'User does not exist' });
      }
    })
    .catch(err => {
        res.status(400).json({ error: err });
    });
});
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], _jwtKey);

  // var decoded = jwt.verify(req.headers['authorization'].replace('Bearer ',''), _jwtKey)
  User.findOne({
    where: {
      userId: decoded.userId
    }
  })
    .then(user => {
      if (user) {
          res.json(user);
          res.status(200);
      } else {
          res.status(404);
          res.send('User does not exist');
      }
    })
    .catch(err => {
        res.status(403);
        res.send('error: ' + err);
    });
});

module.exports = users;
