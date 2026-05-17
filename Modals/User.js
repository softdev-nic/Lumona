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
  tasks:[{
    taskId:{
      type:String,
      required:true
    },
 taskTime:{
  startTime:{
    type:String,
    required:true
  },
  endTime:{
    type:String,
    required:true
  },
 }

  }],
  lastCompletedsession:{
    type:String
  },
  resetToken:{
    type:String
  },
  resetTokenExpires:{
    type:Date
  },
  verified:{
    type:Boolean,
    default:false
  },
  verificationToken:{
    type:String
  },
  verificationTokenExpires:{
    type:Date
  }
  
  



  
})
module.exports = mongoose.model('User', User)