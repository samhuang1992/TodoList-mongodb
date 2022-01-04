const express = require('express')
const router = express.Router()
// 導入models/user.js
const USER = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  // console.log(req)
  // 取得註冊表單參數
  const {name, email, password, confirmPassword} = req.body
  // 尋找有無重複註冊
  USER.findOne({ email }).then((user) => {
    if(user) {
      console.log('User already exists.')
      res.render('register',
        {name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果還沒註冊，寫入資料庫
      USER.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router