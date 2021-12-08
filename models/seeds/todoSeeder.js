const mongoose = require('mongoose')
const Todo = require('../todo') //載入todo model

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
  for (let i = 0; i <10; i++) {
    Todo.create({ name: 'name-' + i})
  }
  console.log('Done') 
})  