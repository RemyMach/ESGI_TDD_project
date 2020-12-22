const express = require('express')
require('./db/mongoose')
const jwt = require('jsonwebtoken')
//const User = require('../src/models/user')
const mongoose = require('mongoose')
const { userOneId, userOne, setupDatabase } = require('../tests/fixtures/db')
const userRouter = require('./routers/user')
const User = require('../src/models/user');


const app = express()
// app.use((req, res, next) => {
//     res.status(503).send('The website is in maintenance')
// })

app.use(express.json())
app.use(userRouter)

module.exports = app