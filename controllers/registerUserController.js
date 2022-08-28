const User = require('../models/User')
const bcrypt = require('bcrypt')


const handleUserRegistration = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ 'message': 'Username & Password are required' })

    const duplicate = await User.findOne({ username: username }).exec();

    if (duplicate) return res.status(409).json({ 'message': 'username aready exists. Try another one' })

    try {
        const hashedPasssword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            "username": username,
            "password": hashedPasssword
        })

        res.status(201).json({ 'message': `User ${username} successfully created` })

    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

module.exports = handleUserRegistration