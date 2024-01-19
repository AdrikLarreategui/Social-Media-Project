const express = require('express')
const router = express.Router()

const commentController = require('../controllers/commentController')
const { authentication } =  require('../middlewares/authentication')

router.post('/', authentication, commentController.create)
module.exports = router



