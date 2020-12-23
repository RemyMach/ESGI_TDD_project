const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { role_administrator, role_editor, role_invite } = require('../../tests/fixtures/role')


router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        if(user.id_role != null)
            throw new Error();
        user.id_role = role_invite._id
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me', async (req, res) => {
    res.send(req.user)
})

module.exports = router