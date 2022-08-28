const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')


const logger = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy\/MM\/dd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        //create dir if it doesn't exists
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }

        // creates file if it doesn't exist
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (error) {
        console.error(error)
    }
}

const logRequests = (req, res, next) => {
    logger(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestsLog.txt')
    next()
}

module.exports = {logger, logRequests}