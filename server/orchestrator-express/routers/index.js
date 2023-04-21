const express = require("express");
const router = express.Router();
const routerUser = require('./users')
const routerItems = require('./items')
const routeCategory = require('./category')
const routeIngredients = require('./ingredient')

router.use("/users",routerUser);
router.use("/items",routerItems);
router.use("/categories",routeCategory);
router.use("/ingredients",routeIngredients);

module.exports = router;