const mongoose = requires('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwword: String,
    tokens: [],
}, { tiemstamps: true })

const User = mongoose.Schema('User', UserSchema)

module.exports = User
