const whitelist = require('./allowedOrigins')

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}


module.exports = corsOptions