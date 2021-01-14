const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Role = require('../../src/models/role')
const Project = require('../../src/models/project.js');
const { role_administrator, role_editor, role_invite } = require('./role')

const user_admin_id = new mongoose.Types.ObjectId()
const user_admin = {
    _id: user_admin_id,
    name: 'Mike',
    email: 'pomme@example.com',
    password: '56 what!!',
    tokens: [{
        token: jwt.sign({ _id: user_admin_id}, process.env.JWT_SECRET)
    }],
    id_role: role_administrator._id
}

const user_editor_id = new mongoose.Types.ObjectId()
const user_editor = {
    _id: user_editor_id,
    name: 'Jess',
    email: 'jean@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: user_editor_id }, process.env.JWT_SECRET)
    }],
    id_role: role_editor._id
}

const user_invite_id = new mongoose.Types.ObjectId()
const user_invite = {
    _id: user_invite_id,
    name: 'Jane',
    email: 'jane@gmail.com',
    password: 'azertyuiop',
    tokens: [{
        token: jwt.sign({ _id: user_invite_id }, process.env.JWT_SECRET)
    }],
    id_role: role_invite._id
}

const setupDatabase = async () => {
    await Role.deleteMany()
    await new Role(role_administrator).save()
    await new Role(role_editor).save()
    await new Role(role_invite).save()

    await User.deleteMany()
    await new User(user_admin).save()
    await new User(user_editor).save()
    await new User(user_invite).save()
}

module.exports = {
    user_admin,
    user_admin_id,
    user_editor,
    user_editor_id,
    user_invite,
    user_invite_id,
    setupDatabase
}