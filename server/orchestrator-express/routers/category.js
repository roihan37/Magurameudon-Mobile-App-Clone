const express = require('express')
const Controller = require('../controllers/categoyController')

const router = express.Router()

router.get('/', Controller.getAllCategory)
router.post('/', Controller.addCategory)
router.delete('/:id', Controller.deleteCategory)

module.exports = router