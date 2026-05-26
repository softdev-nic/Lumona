const Team = require("../../Teams")
const User = require("../../User")
const sendEmail = require("../../../mailer")

const acceptMember = async (req, res) => {
    try {
        const { token } = req.params;
        console.log(token)
        
        const team = await Team.findOne({ invitationToken: token });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        const user = await User.findById(req.user.user.id);
        const creator = await User.findById(team.CreatedBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (team.Members.includes(user._id)) {
            return res.status(400).json({ error: 'User is already a member of the team' });
        }
        team.pendingInvitedMembers.push(user._id)

        sendEmail(
            creator.email,
            "New Team Member Request",
            `${user.name} has requested to join your team ${team.TeamName}. Please review the request in your team management dashboard.`
        );  
        await team.save();
        res.status(200).json({ message: 'Membership request sent to team creator' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = acceptMember;