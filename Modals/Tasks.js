const mongoose = require('mongoose')
const { schema } = require('./User')
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

      type: schema.Types.ObjectId,
      ref:'User'
    
    },

    
})

module.exports = mongoose.model('Tasks',Tasks)