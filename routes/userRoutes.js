const express = require("express");
const { authUser, registerUser } = require("../Controllers/userControlers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
