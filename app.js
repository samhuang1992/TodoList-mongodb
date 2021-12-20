const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = '3000'

// 載入todo model
const Todo = require('./models/todo')
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

app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .sort({ _id: 'asc'})  // desc
  .then(todos => res.render('index', { todos }))  
  .catch(error => console.error(error))
})

// get new 
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
// post new
app.post('/todos', (req, res) => {
  const name = req.body.name
  // 方法一
  // const todo = new Todo({ name })
  // return todo.save('name')
  // .then(()=> res.redirect('/'))
  // .catch(error => console.log(error))
  return Todo.create({ name })
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req,res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then((todo) => res.render('detail', { todo }))
  .catch(error => console.log(error))
})

// update get URL
app.get('/todos/:id/edit', (req,res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then((todo) => res.render('edit', { todo }))
  .catch(error => console.log(error))
})
// update post URL
app.put('/todos/:id', (req, res) => {
  const {name, isDone} = req.body //解構賦值, 一次定義好req.body內的變數 
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      //運算子優先序, 先比 isDone ==='on', 再將結果比對todo.isDone
      todo.isDone = isDone === 'on' 
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
}) 
// Remove post URL
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App.js is running on http://locoalhost${port}`)
})