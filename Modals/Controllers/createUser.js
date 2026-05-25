 const User = require('../User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../mailer');
const crypto = require('crypto');

const createUser = async (req, res) => {

    const userVerification = async (email) => {

        const user = await User.findOne({ email });

        if (!user) {
            return;
        }

        if (!user.verified) {

            const token = crypto.randomBytes(20).toString('hex');

            user.verificationToken = token;
            user.verificationTokenExpires = Date.now() + 5 * 60 * 1000;

            await user.save();

            console.log(token);

            const verificationLink = `https://www.lumona.site/verify/${token}`;

            try {

                await sendEmail(
                    email,
                    "Verification Link",
                    `<a href="${verificationLink}">Verify Email</a>`
                );

            } catch (error) {
                console.log(error);
            }
        }
    };

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format'
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

        await userVerification(email);

        sendEmail(
            newUser.email,
            'Welcome to Lumona!',
            `Hi ${newUser.username}, thank you for joining Lumona! We're excited to have you on board.`
        ).catch((err) => {
            console.error('Email delivery failed:', err);
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = createUser;