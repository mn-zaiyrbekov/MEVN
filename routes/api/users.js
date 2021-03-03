const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../models/Users')
const config = require('../../config/config').secret

/**
 * @route POST api/users/register
 * @description Register the Users
 * @access Public
 */

router.post('/register', (req, res) => {
  const { username, email, login, password, confirm_password } = req.body
  if (password !== confirm_password) return res.status(400).json({error: 'Пароли не совпадают!'})
  // Check for the unique Login
  User.findOne({login: login}).then(user => {
    if (user) {
      res.status(400).json({
        error: 'Пользователь с таким логином уже существует!'
      })
    }
  })  
  // Register new user
  const newUser = new User({
    username,
    email,
    login,
    password
  })
  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.save().then(user => {
        return res.status(201).json({
          success: true,
          msg: 'Успешная регистрация!'
        })
      })
    })
  })
})


/**
 * @route POST api/users/Login
 * @description Signin the Users
 * @access Public
 */

router.post('/login', (req, res) => {
  User.findOne({
    login: req.body.login
  }).then(user => {
    if (!user) {
      res.status(404).json({
        msg: 'ПОльзователь не найден',
        success: fasle
      })
    }
    // hash compare password
    bcrypt.compare(req.body.password, user.password)
    .then(isMatch => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          usename: user.username,
          email: user.email,
          login: user.login          
        }
        jwt.sign(payload, config, {
          expiresIn: 604800
        }, (err, token) => {
          res.status(200).json({
            success: 'ok',
            token: `Bearer ${token}`,
            msg: 'Вход выполнен!'
          })
        })
      }else{
        res.status(404).json({
          msg: 'Не правильный пароль!',
          success: fasle
        })
      }
    })
  })
})



module.exports = router
