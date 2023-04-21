const express = require('express')
const Controller = require('../controllers/categoryController')

const router = express.Router()

router.get('/', Controller.getAllCategory)
router.post('/', Controller.addCategory)
router.delete('/:id', Controller.deleteCategory)

module.exports = router