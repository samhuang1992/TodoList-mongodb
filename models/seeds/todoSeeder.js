//salt
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Todo = require('../todo') //載入todo model
const db = require('../../config/mongoose')
const USER = require('../user')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password:'12345678'
}
// user登入後直接新增資料
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => USER.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length:10 }, (_, index) =>
        Todo.create({ name: `name-${index}`, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})