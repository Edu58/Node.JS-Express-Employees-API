const express = require('express')
const router = express.Router()
const register = require('../controllers/registerUserController')
const login = require('../controllers/authUserController')
const refresh = require('../controllers/refreshTokenController')
const logout = require('../controllers/logoutController')

router.get('/', (req, res) => {
    res.send('Hello at home')
})

router.post('/login', login)
router.post('/register', register)
router.get('/refresh', refresh)
router.get('/logout', logout)

module.exports = router