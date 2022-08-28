const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const handleLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ 'message': 'username & password are required' })

    const foundUser = await User.findOne({ username: username }).exec()

    if (!foundUser) return res.status(401).json({ 'message': 'User with provided credentials does not exist' })

    const matchDetails = await bcrypt.compare(password, foundUser.password)

    if (matchDetails) {
        const roles = Object.values(foundUser.roles)

        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": foundUser.roles,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3m" }
        )

        const refreshToken = jwt.sign(
            {
                "username": foundUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        )

        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }) // add secure: true in production
        res.json({ accessToken })
    } else {
        res.status(401).json({ 'message': 'User with provided credentials does not exist'})
    }
}

module.exports = handleLogin