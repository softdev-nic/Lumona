const Tasks = require('../Tasks')
const updateEmployeeScore = require('./UpdateEmployeeScore');
const updateScore = require('./UpdateScore');
const User = require('../User');
const UpdateEmployeeScore = require('./UpdateEmployeeScore');
const getTasks = async(req,res)=>{
    try {
        const tasks = await Tasks.find({TaskCreatedBy:req.user.user.id});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
const deleteTask = async(req,res)=>{
    try {
    const task = await Tasks.findOneAndDelete({
        _id:req.params.id,
        TaskCreatedBy:req.user.user.id
    });
    if(!task){
        return res.status(404).json({
            error:'Task not found'
        });
        }
    res.json({
        message:'Task deleted successfully'
    });

}catch(error){
    res.status(500).json({
        error:error.message
    });
}

}
const CompletedTask = async(req,res)=>{
 
    try {
        const task = await Tasks.findOne({
            _id:req.params.id,
            TaskCreatedBy:req.user.user.id
        });

        if(!task){
            return res.status(404).json({
                error:'Task not found'
            });
        }
        task.TaskStatus = 'Completed';
        await task.save();
       await  UpdateEmployeeScore(task.TaskCreatedBy);
    res.json({
        message:'Task completed successfully'
    });
    setTimeout(()=>{

    },1000)
}catch(error){
    res.status(500).json({
        error:error.message
    });
}
}   
    module.exports = {getTasks, deleteTask, CompletedTask}
 