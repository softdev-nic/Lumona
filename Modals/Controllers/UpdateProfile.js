 const User = require('../User');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const user = await User.findById(req.user.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        user.username = username || user.username;

        user.email = email || user.email;

        if (password) {

            const hashedPassword = await bcrypt.hash(password, 10);

            user.password = hashedPassword;
        }

        await user.save();

        res.json({
            message: 'User updated successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = updateUser;