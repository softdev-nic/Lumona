const team = require('../Teams')
const User = require('../User')


const getMembers = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const teamId = user.teamId;
        if (!teamId) {
            return res.status(404).json({ message: 'User is not part of any team' });
        }

        const Myteam = await team.findById(teamId)

        if (!Myteam) {
            return res.status(404).json({ message: 'Team not found' });

        }

        const memberIds = Myteam.Members.map(member => member._id);
        const membersDetails = await User.find({ _id: { $in: memberIds } }).select('-password');

        return res.json({ members: membersDetails });
         
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getMembers;