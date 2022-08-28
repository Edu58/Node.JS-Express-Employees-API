const { logger } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logger(`${err.name}\t${err.message}`, 'errorsLog.txt')
    res.status(500).send(err.message)
}

module.exports = errorHandler