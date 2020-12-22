const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {

    /*const userTwoId = new mongoose.Types.ObjectId()
    const user = {
        _id: userTwoId,
        name: 'Jess',
        email: 'jess@example.com',
        password: 'myhouse099@@',
        tokens: [{
            token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
        }]
    }
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }*/
})

module.exports = router