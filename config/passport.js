const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const USER = require('../models/user')
const bcrypt = require('bcryptjs')


// 後續會將function匯入app.js
module.exports = app => {
  // Middleware
  // 初始化passport模組 
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    USER.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
         return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    USER.findById(id)
      .lean()
    // 查詢DB運作正常,回傳查找的結果user
    .then(user => done(null, user))
    // 查詢DB運作錯誤,回傳err,passport抓到err就不會處理後參數
    .catch(err => done(err, null))
  })
}