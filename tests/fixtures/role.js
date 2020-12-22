const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Role = require('../../src/models/role')

const role_administrator = {
    _id: new mongoose.Types.ObjectId(),
    label: 'administrator'
}

const role_editor = {
    _id: new mongoose.Types.ObjectId(),
    label: 'editor'
}

const role_invite = {
    _id: new mongoose.Types.ObjectId(),
    label: 'invite'
}

module.exports = {
    role_administrator,
    role_editor,
    role_invite
}