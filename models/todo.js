const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name:{
    type:String, //資料型別是字串
    required:true //必填欄位
  }
})

module.exports = mongoose.models('Todo', todoSchema)