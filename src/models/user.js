const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    // création du tableau tokens pour jwt
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    id_role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }
},{
    // POUR POUVOIR UTILISER UN timestamp il faut que ce soit dans un Schema
    timestamps: true
})

// ici on pourra l'utiliser avec une instance de User donc un objet user et pas 
// la collection User comme avec la méthode findByCredentials
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), iat: Math.floor(Date.now() / 1000) - 30 }, process.env.JWT_SECRET)
    // user.tokens est alors un tableau
    // avec concat j'ajout token: valuetoken dans le tableau
    // l'_id se rajoute automatiquement, c'est l'id du token et pas du user 
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// pour ne pas renvoyer toutes les informations sensible dans le renvoie du user
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    
    //on supprime le token et le password de l'objet renvoyé
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    // on récupère le user avant qu'il soit créé
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// On définit le modèle User
const User = mongoose.model('User', userSchema)

module.exports = User
