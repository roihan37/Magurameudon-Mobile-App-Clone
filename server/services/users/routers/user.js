const express = require("express");
const router = express.Router();

const {
  
  createUser,
  loginUser,
  findAllUser,
  destroyUser,
  findById
} = require("../controllers/user");


router.get("/", findAllUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", findById);
router.delete("/:id", destroyUser);


module.exports = router;