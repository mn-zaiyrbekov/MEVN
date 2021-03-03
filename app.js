const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')


// INITIALIZE APP
const app = express()

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
