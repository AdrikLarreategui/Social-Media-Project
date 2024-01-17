const User = require('../models/users')

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
            await User.create(req.body)
            res.status(201)
            res.send({message: 'Usuario registrado con éxito'})
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'Error al registar el usuario'})
        }
    },

    login(req, res) {
        User.findOne({
            where: {email: req.body.email}
        }).then(users=> {
            if(!users) {
                return res.status(400).send({ message:"Usuario o contraseña incorrectos" })
            }
            const isMatch = bcrypt.compareSync(req.body.password, User.password)
            if(!isMatch) {
                return res.status(400).send({ message:"Usuario o contraseña incorrectos" })
            }
        let token = jwt.sign({ id:User.id}, jwt_secret)
        Token.create({ token, UserId: User.id})
        res.send({ message: 'Bienvenid@' + User.name, User, token })
        })
    },

    async logout (req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
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