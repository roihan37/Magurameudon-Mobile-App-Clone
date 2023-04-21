const express = require("express");
const router = express.Router();
const routerUsers = require("./users");
const routerItems = require("./items");
const routerIngredients = require("./inggredients");
const routerCategory = require("./category");
const routerCustomer = require("./customers");
const { authentication } = require("../middleware/aunth");

router.use("/", routerUsers);
router.use("/pub", routerCustomer);
// router.use(authentication)
router.use("/items", routerItems);
router.use("/ingredients", routerIngredients);
router.use("/categories", routerCategory);

module.exports = router;
