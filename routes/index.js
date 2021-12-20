const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')

router.use('/', home)
router.use('/todos', todos)
// 準備引入路由模組
module.exports = router