const Team = require('../../Teams')
const User = require('../../User')
const sendEmail = require('../../../mailer')
const crypto = require('crypto')

const CreateTeam = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id)
    const { TeamName, OrganizationName} = req.body
    const newTeam = await Team.create({
        TeamName,
        OrganizationName,
        CreatedBy: req.user.user.id,
        invitationToken: crypto.randomBytes(20).toString('hex'),
        Members: [req.user.user.id]


    })
    await sendEmail(
        user.email,
        "Team Created Successfully", 
        `<h1>Team Created</h1>
         <p>Hi ${user.username}, your team <strong>${TeamName}</strong> for <strong>${OrganizationName}</strong> has been created successfully.</p>`
    )
    res.status(201).json({ message: "Team created successfully", team: newTeam })
    } catch (error) {
        res.status(500).json({
            error: error.message

        })
    }
}

module.exports = CreateTeam
