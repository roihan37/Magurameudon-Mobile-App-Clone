const express = require("express");
const Controllers = require("../controllers/usersController");
const router = express.Router();


router.post("/", Controllers.createUser );
router.get("/", Controllers.getAllUser );
router.get("/:id", Controllers.getUserById)
router.delete("/:id", Controllers.destroyUser)


module.exports = router;