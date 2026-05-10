const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  date: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  dailyStats:{
    date:{
      type:String

    },
    tasksCompleted:{
      type:Number,
      default:0
    },

  },
  lastCompletedsession:{
    type:String
  },
  
  



  
})
module.exports = mongoose.model('User', User)