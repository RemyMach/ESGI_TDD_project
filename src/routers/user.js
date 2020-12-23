const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { role_administrator, role_editor, role_invite } = require('../../tests/fixtures/role')
const auth = require('../middleware/auth')


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

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// logout un user et on efface son jeton
router.post('/users/logout', auth, async (req, res) => {
    // copie dans req.user.tokens tous les tokens qui ne sont pas égau à req.token
    // permet d'avoir tous les token dans req.user.tokens sauf le valide
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        //console.log(req.user, req.token)
        await req.user.save()
        res.status(200).send()
    }catch(e) {
        res.status(400).send()
    }
})


module.exports = router