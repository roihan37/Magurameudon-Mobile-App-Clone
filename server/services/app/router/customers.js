const express = require('express')
const Controller = require('../controllers/customerController')
// const Controller = require('../controllers/ingredientController')
// const Controller = require('../controllers/itemController')
const router = express.Router()

router.get('/items', Controller.getAllItems)
router.get('/items/:id', Controller.getAllItemsById)
router.get('/ingredients/:itemId', Controller.getAllIngredientById)

module.exports = router