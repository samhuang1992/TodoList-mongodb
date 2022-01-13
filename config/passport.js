const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

    passport.use(new FacebookStrategy({
    clientID: '499567324826080',
    clientSecret: 'd6b3ce7d4a562049f6075f2b12cd510c',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
      const { name , email } = profile._json
      USER.findOne({ email })
      .then(user => {
        if(user) return done(null, user)
      
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
        .genSalt(10) //產生難度為10的鹽
        .then(salt => bcrypt.hash(randomPassword, salt)) //為使用者密碼加鹽,產生雜湊值
        .then(hash => USER.create({
          name,
          email,
          password: hash //將雜湊值取代資料庫原本的密碼
        }))    
      })
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