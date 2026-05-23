const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TeamSchema = new Schema({
    TeamName:{
    type:String,
    required:true
  },
 OrganizationName:{
    type:String
    
  },
 
CreatedBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
},
Members:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
]


})
  

module.exports = mongoose.model('Team', TeamSchema)