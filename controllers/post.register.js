const User = require('../models/model.user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
    try {
        //Get data from client
        const { username, email, password } = req.body

        //Check if user already exists in database
        const isUserExists = await User.exists({ username: username.toLowerCase(), email: email.toLowerCase() })
        if (isUserExists) {
            res.status(409).json({ 'message': 'User already exists with given email or username' })
        }

        //Encrypt password
        const encryptedPassword = await bcrypt.hash(password, 12)

        //Create user document and save to database
        const newUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        //Create JWT token :TODO
        const token = jwt.sign({ userId: newUser._id, email }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(201).json({
            'userInfo': {
                username: newUser.username,
                email: newUser.email,
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({ 'error': 'Error occured, please try again!' + error.message })
    }
}


module.exports = register