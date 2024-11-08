const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);

module.exports = router;
