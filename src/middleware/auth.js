const jwt = require('jsonwebtoken')
const User = require(('../models/user'))

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user){
            // déclenche l'erreur du catch du dessous
            throw new Error()
        }
        //pour avoir accès au token
        req.token = token

        // permettre dans les routes d'utiliser l'utilisateur connecté avec req.user
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = auth