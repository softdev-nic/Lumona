const Tasks = require('../Tasks')
const TasksSetter = async(req,res)=>{

const {TaskName,TaskDescription,TaskStartTime,TaskEndTime,TaskStatus} = req.body;
const task = await Tasks.create({
  TaskName,
  TaskDescription,
  TaskStartTime,
  TaskEndTime,
  TaskStatus,
  TaskCreatedBy:req.user.user.id
})
 

}
module.exports = TasksSetter;

