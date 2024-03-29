const Comment = require('../models/comment')

const CommentController = {
    async create (req, res) {
        try {
            const comment = await Comment.create({
                ...req.body,
                UserId: req.user_id
            })
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el comentario'})
        }
    }
}

module.exports = CommentController

