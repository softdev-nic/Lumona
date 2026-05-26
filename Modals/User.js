const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
  teamId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
  },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  date: { type: Date, default: Date.now },
  role:{
    type:String,
    enum:['manager','employee'],
    default:'employee'
  
  },
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
  },
  product:{
    type:String,
    enum:['personal','teams'],
    default:'personal'
  
  }
  
  



  
})
module.exports = mongoose.model('User', User)