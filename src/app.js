const express = require('express')
require('./db/mongoose')
const jwt = require('jsonwebtoken')
//const User = require('../src/models/user')
const mongoose = require('mongoose')
const { userOneId, userOne, setupDatabase } = require('../tests/fixtures/db')
const userRouter = require('./routers/user')
const projectRouter = require('./routers/project.js');
const User = require('../src/models/user');
const bodyParser = require('body-parser');

const app = express();
// app.use((req, res, next) => {
//     res.status(503).send('The website is in maintenance')
// })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(bodyParser.json()); 
app.use(userRouter);
app.use('/project', projectRouter);


module.exports = app;