const users = require('../models/users')
//const comments = require('../')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authoritation
        const payload = jwt.verify(token, jwt_secret)
        const user = await users.findOne({ _id: payload._id, tokens: token })
        if(!user) {
            return res.status(401).send({ message: 'No estás autorizado'})
        }
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token'})
    }
}

module.exports = { authentication };