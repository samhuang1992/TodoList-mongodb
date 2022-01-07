const express = require('express')
const router = express.Router()
// 導入models/user.js
const USER = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})
// 加入middleware, 驗證request登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if(!name || !email || !password || !confirmPassword) {
     errors.push({ message: '所有欄位都是必填！'})
  }
  if(password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！'})
  }
  if(errors.length) {
    return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
  }

  USER.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '此信箱已經註冊過！'})
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
      return USER.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.flash('success_msg', '您已成功登出！')
  req.logout()
  res.redirect('/users/login')
})

module.exports = router