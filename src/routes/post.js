const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const { Authentication } = require('../middlewares/authentication')

router.post('/', PostController.create)
router.put('/:_id', PostController.update)
router.delete('/:_id', PostController.delete)
router.get('/.', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.get('/name/:name', PostController.getPostByName)


