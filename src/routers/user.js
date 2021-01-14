const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { role_administrator, role_editor, role_invite } = require('../../tests/fixtures/role')
const { auth, auth_administrator } = require('../middleware/auth')
const { verifyNewPasswords } = require ('../controllers/user')
const bcrypt = require('bcryptjs')



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
        res.status(400).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// logout un user et on efface son jeton
router.get('/users/logout', auth, async (req, res) => {
    // copie dans req.user.tokens tous les tokens qui ne sont pas égau à req.token
    // permet d'avoir tous les token dans req.user.tokens sauf le valide
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    //console.log(req.user, req.token)
    await req.user.save()
    res.status(200).send()
})

router.patch('/users/password', auth, async (req, res) => {

    try {
        verifyNewPasswords(req.body);
        const user = await User.findByCredentials(req.user.email, req.body.old_password);
        user.password = req.body.new_password;
        await user.save();
        res.status(200).send();
    }catch(e){
        res.status(400).send(e)
    }

})

router.delete('/users/delete', auth, async (req, res) => {

    try {
        if(await bcrypt.compare(req.body.password, req.user.password) != true)
            throw new Error();
        
        await req.user.delete();
        res.status(200).send();
    }catch(e) {
        res.status(400).send(e);
    }
})

router.post('/users/admin/create', auth_administrator, async (req, res) => {

    const user = new User(req.body)
    try {
        if(user.id_role.toString() === role_administrator._id.toString())
            throw new Error();
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/admin/delete', auth_administrator, async (req, res) => {

    try {
        const user = await User.findById(req.body.id_user);

        if(user.id_role.toString() != role_editor._id.toString() && user.id_role.toString() != role_invite._id.toString())
            throw new Error();
        
        
        
        if(await bcrypt.compare(req.body.password, req.user.password) != true)
            throw new Error();
        
        
        
        await user.delete();
        res.status(200).send();
    }catch(e) {
        res.status(400).send(e);
    }
})

router.patch('/users/admin/update/role', auth_administrator, async (req, res) => {

    try {
        const user = await User.findById(req.body.id_user);

        if(user.id_role.toString() != role_editor._id.toString() && user.id_role.toString() != role_invite._id.toString())
            throw new Error();
        
        
        if(await bcrypt.compare(req.body.password, req.user.password) != true)
            throw new Error();
        
        user.id_role = req.body.id_new_role
        await user.save(); 
        res.status(200).send();
    }catch(e) {
        res.status(400).send(e);
    }
})
 

module.exports = router