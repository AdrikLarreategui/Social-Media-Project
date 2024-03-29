const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        required: true,
        },
    passwword: {
        type: String,
        required: true,
        },
    tokens: [],
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User

