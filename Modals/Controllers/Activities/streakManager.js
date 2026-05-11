 const User = require('../../User');

const streakManager = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const now = new Date();

        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const lastSession = user.lastCompletedsession
            ? new Date(user.lastCompletedsession)
            : null;

        if (lastSession) {

            const lastDay = new Date(
                lastSession.getFullYear(),
                lastSession.getMonth(),
                lastSession.getDate()
            );

            const diffDays = Math.floor(
                (today - lastDay) / (1000 * 60 * 60 * 24)
            );

            if (diffDays === 0) {
                return res.json({
                    message: 'Streak already updated today',
                    streak: user.streak,
                    longestStreak: user.longestStreak,
                    lastCompletedsession: user.lastCompletedsession
                });
            }

            if (diffDays === 1) {
                user.streak += 1;
            } else {
                user.streak = 1;
            }

        } else {
            user.streak = 1;
        }

        user.lastCompletedsession = now;

        if (user.streak > user.longestStreak) {
            user.longestStreak = user.streak;
        }

        await user.save();

        res.json({
            message: 'Streak updated successfully',
            streak: user.streak,
            longestStreak: user.longestStreak,
            lastCompletedsession: user.lastCompletedsession
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = streakManager;