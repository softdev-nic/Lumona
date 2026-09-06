const User = require('../../User')

const getDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getDetails