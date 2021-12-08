const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()
const port = '3000'

mongoose.connect('mongodb://localhost/todo-list')
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線錯誤
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({defultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App.js is running on http://locoalhost${port}`)
})