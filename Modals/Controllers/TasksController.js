const Tasks = require('../Tasks')

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
    module.exports = {getTasks, deleteTask}
 