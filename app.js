const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config/config')


// INITIALIZE APP
const app = express()

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// STATIC DIRECTORY
app.use(express.static(path.join(__dirname, 'public')))

// CONFIG AND CONNECT TO DATABASE
require('./config/db')()

// ROUTES
const user = require('./routes/api/users')
app.use('/api/users', user)

// STARTING SERVER
const start = async () => {
  app.listen(config.PORT, () => {
    console.log(`Server started on PORT ${config.PORT}`)
  })
}
start()
