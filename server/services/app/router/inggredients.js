const express = require('express')
const Controller = require('../controllers/ingredientController')
// const Controller = require('../controllers/itemController')
const router = express.Router()

router.get('/', Controller.getAllIngredient)
router.get('/:itemId', Controller.getIngredientById)


module.exports = router