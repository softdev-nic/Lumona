const User = require('../User');

const UpdateEmployeeScore = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId,{
            $inc:{
                score:5
            }
            })
        
    }catch(error){
        return error;
    }
    }
    module.exports = UpdateEmployeeScore;



    