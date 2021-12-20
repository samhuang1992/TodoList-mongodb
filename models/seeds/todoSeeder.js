const Todo = require('../todo') //載入todo model
const db = require('../../config/mongoose')
// 連線成功,並新增10筆資料
db.once('open', () => {
  for (let i = 0; i <10; i++) {
    Todo.create({ name: 'name-' + i})
  }
  console.log('Done') 
})  