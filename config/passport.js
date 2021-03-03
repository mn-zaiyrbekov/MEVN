const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Users = require('../models/Users')
const config = require('./config').secret

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      Users.findById(jwt_payload._id).then(user => {
        if (user) return done(null, user)
        return done(null, false)
      }).catch(err => {
        console.log(err)
      })
    })
  ) 
}
