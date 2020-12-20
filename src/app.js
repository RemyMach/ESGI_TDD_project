const express = require('express')
require('./db/mongoose')

const app = express()

app.use((req, res, next) => {
    res.status(200).send('The website environment is ready')
})

// app.use((req, res, next) => {
//     res.status(503).send('The website is in maintenance')
// })

app.use(express.json())
module.exports = app