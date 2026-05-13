const User = require('../../User');

const resetPasswordSetter = async (req, res) => {
    const {password} = req.body;
    if(!password){
        return res.status(400).send("Password is required");
    }
    const token = req.params.token;
    const user = await User.findOne({resetToken:token,
        resetTokenExpires:{$gt:Date.now()}
    });

    if(!user){
        return res.status(404).send("Invalid or expired token");
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).send("Password reset successful");
};
