const User = require("../User");

const verifyUser = async(req,res)=>{
    try{
        const {token} = req.params;
        const user = await User.findOne({verificationToken:token,
            verificationTokenExpires: { $gt: Date.now() }
        });
        if(!user){
            await User.deleteOne({ verificationToken: token });
            return res.status(404).json({ error: "Invalid token or token expired" });
        }
        user.verified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();
        return res.status(200).json({message:"Email verified successfully"});
    }catch(error){
        return res.status(500).json({error:error.message});
    }   

};
module.exports = verifyUser;
