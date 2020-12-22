const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    }},{
    timestamps: true
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role