const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name:{
    type: String,
    required: true //必填欄位
  },
  email:{
    type: String, 
    required: true 
  },
  password:{
    type: String, 
    required: true 
  },
  createdAt:{
    type: Date, // 帶入註冊日期
    default: Date.now 
  },

})

module.exports = mongoose.model('user', userSchema)