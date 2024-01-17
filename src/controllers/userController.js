const users = require('../models/users')

const userController = {
    async register (req, res) {
        try {
            const user = await users.create({ ...req.body, role: "User"})
            res.status(201).send({ message: "Usuario registrado con éxito", user})
        } catch (error) {
            console.error(error)
        }
    },
    async logout (req, res) {
        try {
            await users.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            })
            res.send({ message:"Usuario desconectado con éxito" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ 
                message: "Ha habido un problema con la desconexión del usuario"
            })
        }
    }
}

module.exports = userController