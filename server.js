require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsConfig')
const { logRequests } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

//Connect to database
connectDB()

const app = express()
const PORT = process.env.PORT || 3500

//custom logger middleware
app.use(logRequests)

// solve cors Access-Control-Allow-Credentials
app.use(credentials)

// solve cors errors
app.use(cors(corsOptions))

// middleware to get form-data from request
app.use(express.urlencoded({ extended: false }))

// middleware to get json in request
app.use(express.json())

// get access to cookies
app.use(cookieParser())

// middleware to help serve static files
app.use(express.static(path.join(__dirname, '/public')))

//router
app.use('/', require('./routes/homeRoutes'))
app.use('/employees', require('./routes/employees'))

app.use(errorHandler)


mongoose.connection.once('connected', () => {
    console.log('Connected to DB')

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})
