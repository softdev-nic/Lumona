const sendEmail = require("../../../mailer");
const Team = require("../../Teams");
const User = require("../../User");


const addMember = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const team = await Team.findOne({
            CreatedBy: req.user.user.id
        });
    
        const InvitationLink = `https://teams.lumona.site/accept-invitation/${team.invitationToken}`;
        await sendEmail(
            email,
            "Team Invitation",
            `<a href="${InvitationLink}">Join Team</a>`
        );
        res.status(200).json({message: 'Invitation sent successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
};

module.exports = addMember;
    
        
        
