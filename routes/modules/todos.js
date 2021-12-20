const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// get new 
router.get('/new', (req, res) => {
  return res.render('new')
})
// post new
router.post('/', (req, res) => {
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

router.get('/:id', (req,res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then((todo) => res.render('detail', { todo }))
  .catch(error => console.log(error))
})

// update get URL
router.get('/:id/edit', (req,res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then((todo) => res.render('edit', { todo }))
  .catch(error => console.log(error))
})
// update post URL
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router