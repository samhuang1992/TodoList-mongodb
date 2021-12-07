const express = require('express')
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.send('Hello web')
})

app.listen(port, () => {
  console.log(`App.js is running on http://locoalhost${port}`)
})