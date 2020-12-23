const jwt = require('jsonwebtoken')
const User = require(('../models/user'))
const { role_administrator, role_editor, role_invite } = require('../../tests/fixtures/role')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        //pour avoir accès au token dans les routes après
        req.token = token

        // permettre dans les routes d'utiliser l'utilisateur connecté avec req.user
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

const auth_editor_administrator = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    
        if(user.id_role.toString() !== role_administrator._id.toString()) {
            throw new Error();
        }
        //pour avoir accès au token dans les routes après
        req.token = token

        // permettre dans les routes d'utiliser l'utilisateur connecté avec req.user
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = {
    auth,
    auth_editor_administrator
}