const team = require("../../Teams")
const User = require("../../User")

const GetPendingInvites = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id)
        if (!user.teamId) {
            return res.status(404).json({ message: "User is not part of any team" })
        }
        const teamData = await team.findById(user.teamId)
        if (!teamData) {
            return res.status(404).json({ message: "Team not found" })
        }
        if(teamData.CreatedBy.toString() !== req.user.user.id){
            return res.status(403).json({ message: "Only team creator can view pending invites" })
        }
        const pendingInvites =  teamData.pendingInvitedMembers
        res.status(200).json({ pendingInvites })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = GetPendingInvites