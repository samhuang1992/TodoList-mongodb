const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = '3000'
// 載入mongoose.js
require('./config/mongoose')

app.engine('hbs', exphbs({defultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`App.js is running on http://locoalhost${port}`)
})