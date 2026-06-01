const Tasks = require('../Tasks')
const TasksSetter = async(req,res)=>{
    try {
        const {TaskName, TaskDescription, TaskStartTime, TaskEndTime, TaskStatus,AssignedTo} = req.body;
        
        const task = await Tasks.create({
            TaskName,
            TaskDescription,
            TaskStartTime,
            TaskEndTime,
            TaskStatus,
            TaskCreatedBy: req.user.user.id,
            AssignedTo: AssignedTo || null
            
        });
        
        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
module.exports = TasksSetter;
