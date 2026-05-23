const mongoose = require('mongoose')

const Tasks = new mongoose.Schema({
    TaskName:{
      type:String,
      required:true
    },
    TaskDescription:{
      type:String,
      required:true
    },
    TaskStartTime:{
      type:String,
      required:true
    },
    TaskEndTime:{
      type:String,
      required:true
    },
    TaskStatus:{
      type:String,
      required:true
    },
   TaskCreatedBy:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'User'
},
AssignedTo:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
},
TaskCreatedAt:{
  type:Date,
  default:Date.now
}


    
})

module.exports = mongoose.model('Tasks',Tasks)