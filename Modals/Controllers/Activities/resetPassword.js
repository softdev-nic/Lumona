const User = require('../../User')
const crypto = require('crypto')
   
const sendEmail = require('../../../mailer')
require('dotenv').config()  
const resetPasswordMail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 10*60*1000;
        const ResetLink = `https://www.lumona.site/resetpassword/${resetToken}`
        user.resetToken = resetToken;
        user.resetTokenExpires = resetTokenExpiry;
        await user.save();
        
       await sendEmail(user.email, 'Reset Password here', `<a href="${ResetLink}">Reset Password</a>`)
       res.status(200).json({
        success:true,
        message:'Reset password link sent to email'
       })
       
     
    } catch (error) {
        res.status(500).json({ success:false, error: error.message});
    }
};

module.exports = resetPasswordMail;
