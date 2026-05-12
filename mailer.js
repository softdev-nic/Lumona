 const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });

        console.log('Email sent:', info.messageId);

        return {
            success: true,
            messageId: info.messageId
        };

    } catch (error) {
        console.error('Error sending email:', error);

        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = sendEmail;