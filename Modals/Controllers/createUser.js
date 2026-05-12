 const User = require('../User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../mailer');

const createUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

        await sendEmail(
            newUser.email,
            'Welcome to Lumona!',
            `Hi ${newUser.username}, thank you for registering at Lumona.`
        );

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = createUser;