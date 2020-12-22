const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router