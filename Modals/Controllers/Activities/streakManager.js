 const User = require('../../User');

const updateStreak = async (userId) => {

    try {

        const user = await User.findById(userId);

        if(!user){
            return;
        }

        const currentDate = new Date();

        const lastCompletedSession = user.lastCompletedSession;

        if(!lastCompletedSession){

            user.streak = 1;

            await user.save();

            return;
        }

        const lastDate = new Date(lastCompletedSession);

        // normalize time
        currentDate.setHours(0,0,0,0);
        lastDate.setHours(0,0,0,0);

        const oneDay = 24 * 60 * 60 * 1000;

        const difference =
            (currentDate - lastDate) / oneDay;

        if(difference === 1){

            user.streak++;

        }else if(difference > 1){

            user.streak = 1;

        }

        await user.save();

    } catch(error){

        console.log(error);

    }

}

module.exports = updateStreak;