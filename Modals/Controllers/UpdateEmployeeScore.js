const User = require('../User');
const updateStreak = require('./Activities/streakManager');
const UpdateEmployeeScore = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId,{
            $inc:{
                score:5,
                 
            },
            $set:{
                lastCompletedsession:new Date()
                
            

            }
        },{
            new:true
            })
            await updateStreak(userId);
            return user;
        
    }catch(error){
        throw error;
    }
    }
    module.exports = UpdateEmployeeScore;



    