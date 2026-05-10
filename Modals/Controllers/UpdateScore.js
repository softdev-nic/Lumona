const User = require('../User');

const updateScore = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }   
        user.score += 5;
        await user.save();
        return res.json({
            message: 'Score updated successfully',
            score:user.score
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = updateScore;