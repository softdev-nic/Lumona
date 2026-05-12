const mailer = require('nodemailer');
require('dotenv').config();

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text
        };
      const result =  await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", result.messageId);
        return result
        } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;

