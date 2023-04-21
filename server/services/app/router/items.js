const express = require('express')
const Controller = require('../controllers/itemController')
const router = express.Router()

router.get('/', Controller.getAllItems)
router.post('/', Controller.addItem)
router.get('/:id', Controller.getItemById)
router.put('/:id', Controller.editItem)
router.delete('/:id', Controller.destroyItem)


module.exports = router