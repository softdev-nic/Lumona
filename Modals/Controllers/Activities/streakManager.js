const User = require('../../User');

const updateStreak = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id);
        if (!user) {
            return res.status(404).json({
                error:'User not found'
                });
        }   

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const lastSessionDate = user.lastCompletedsession ? new Date(user.lastCompletedsession) : null;
        
        if (lastSessionDate) {
            const lastSessionDay = new Date(lastSessionDate.getFullYear(), lastSessionDate.getMonth(), lastSessionDate.getDate()).getTime();
            const diffDays = (today - lastSessionDay) / (1000 * 60 * 60 * 24);

            if (diffDays === 0) {
                return res.json({ message: 'Streak already updated today', streak: user.streak });
            } else if (diffDays > 1) {
                user.streak = 1;
            } else {
                user.streak += 1;
            }
        } else {
            user.streak = 1;
        }

        user.lastCompletedsession = now.toISOString();


        if (user.longestStreak < user.streak) {
            user.longestStreak = user.streak;
        }
        await user.save();
        res.json({
            message: 'Streak updated successfully',
            streak:user.streak,
            currentStreak:user.currentStreak,
            longestStreak:user.longestStreak
        });
        } catch (error) {
        res.status(500).json({
            error:error.message
        });
    }
};

module.exports = updateStreak;