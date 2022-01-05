const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
// userPassport設定檔要放在session後面
const usePassport = require('./config/passport')
// 載入mongoose.js
require('./config/mongoose')
const app = express()
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000



app.engine('hbs', exphbs({defultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
// userPassport呼叫app要放在路由前面
usePassport(app)

// 設定本地變數res.locals , 將資料交接給res用
app.use((req, res, next)=> {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App.js is running on http://localhost:${PORT}`)
})