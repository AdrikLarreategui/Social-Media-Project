const users = require('../models/users')

const userController = {
    create(req, res) {
        const { name, email, password } = req.body
        if(!name || !email || password) {
            return res.status(400).send('Por favor, completa todos los campos')
        }
        const hashedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 10): undefined
        if(hashedPassword === undefined) {
        return res.status(400).send('Contraseña requerida')
        }
    },

    async register (req, res) {
        try {
            const user = await users.create({ ...req.body, role: "User"})
            res.status(201).send({ message: "Usuario registrado con éxito", user})
        } catch (error) {
            console.error(error)
        }
    },

    login(req, res) {
        users.findOne({
            where: {email: req.body.email}
        }).then(users=> {
            if(!users) {
                return res.status(400).send({ message:"Usuario o contraseña incorrectos" })
            }
            const isMatch = bcrypt.compareSync(req.body.password, users.password)
            if(!isMatch) {
                return res.status(400).send({ message:"Usuario o contraseña incorrectos" })
            }
        let token = jwt.sign({ id:users.id}, jwt_secret)
        Token.create({ token, UserId: users.id})
        res.send({ message: 'Bienvenid@' + user.name, user, token })
        })
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