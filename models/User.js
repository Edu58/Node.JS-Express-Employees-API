const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)