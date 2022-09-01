const User = require('../models/model.user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //Find user with email
        const user = await User.findOne({ email: email.toLowerCase() })
        //If the user exists and check if given password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            //send new token
            const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: '24h' })
            return res.status(200).json({
                userDetails: {
                    email: user.email,
                    username: user.username,
                    token: token
                }
            })
        }
        return res.status(400).json({ "message": "Invalid credentials" });

    } catch (error) {
        res.status(500).json({ 'error': 'Error occured, please try again! ' + error.message })
    }
}

module.exports = login