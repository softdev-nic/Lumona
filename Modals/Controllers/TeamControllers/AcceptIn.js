 const User = require("../../User");
const Team = require("../../Teams");
const sendEmail = require("../../../mailer");

const AcceptPendingMember = async (req, res) => {

    try {

        const manager = await User.findById(
            req.user.user.id
        );

        const team = await Team.findById(
            manager.teamId
        );

        if (!team) {

            return res.status(404).json({
                message: "Team not found"
            });

        }

        if (
            team.CreatedBy.toString() !==
            manager._id.toString()
        ) {

            return res.status(403).json({
                message:
                "You are not the manager of this team"
            });

        }

        const { acceptId } = req.body;

        const isPending =
        team.pendingInvitedMembers.find(

            (member)=>

                member.toString() === acceptId

        );

        if (!isPending) {

            return res.status(404).json({

                message:
                "User not found in pending members"

            });

        }

        team.Members.push(acceptId);

        team.pendingInvitedMembers =
        team.pendingInvitedMembers.filter(

            (member)=>

                member.toString() !== acceptId

        );

        await team.save();

        const employee =
        await User.findByIdAndUpdate(

            acceptId,

            {
                teamId: team._id
            },

            { new:true }

        );

        await sendEmail(

            employee.email,

            "Team Invitation Accepted",

            `Your request to join the team ${team.TeamName} has been accepted.`

        );

        await sendEmail(

            manager.email,

            "New Team Member Accepted",

            `${employee.name} has joined your team ${team.TeamName}.`

        );

        return res.status(200).json({

            message:
            "User accepted to the team"

        });

    } catch (error) {

        return res.status(500).json({

            message:error.message

        });

    }

};

module.exports = AcceptPendingMember;