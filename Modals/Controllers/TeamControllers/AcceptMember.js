const Team = require("../../Teams")
const User = require("../../User")
const sendEmail = require("../../../mailer")

const acceptMember = async (req, res) => {
    try {
        const { token } = req.params;
        const team = await Team.findOne({ invitationToken: token });
        if (!team) {
            return res.status(404).json({ error: 'Invalid invitation token' });
        }
        const user = await User.findById(req.user.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (team.Members.includes(user._id)) {
            return res.status(400).json({ error: 'User is already a member of the team' });
        }
        team.Members.push(user._id);
        await team.save();
        const creator = await User.findById(team.CreatedBy);
        await sendEmail(
            creator.email,
            "New Team Member",
            `${user.username} has accepted the invitation to join your team ${team.TeamName}.`
        );
        res.status(200).json({ message: 'You have successfully joined the team' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = acceptMember;