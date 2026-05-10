const User = require('../../User');

const getScore = async (req, res) => {
    const user = await User.findById(req.user.user.id);
    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }
    return res.json({
        score: user.score
    });
};

module.exports = getScore;