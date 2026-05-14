const User = require('../../User');
const bcrypt = require('bcryptjs');

const resetPasswordSetter = async (req, res) => {
    const { newpassword } = req.body;
    if(!newpassword){
        return res.status(400).send("Password is required");
    }
    
    const token = req.params.token;
    const user = await User.findOne({resetToken:token,
        resetTokenExpires:{$gt:Date.now()}
    });

    if(!user){
        return res.status(404).send("Invalid or expired token. token expired");
        
    }
    user.password = await bcrypt.hash(newpassword,10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    return res.status(200).send("Password reset successful");
};

module.exports = resetPasswordSetter;
