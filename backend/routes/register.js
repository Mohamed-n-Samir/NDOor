const express = require("express");
const router = express.Router();
const { register, activateAccount, login } = require("../controllers/userRegister");
const { home } = require("../controllers/homeController");

router.route("/register").get(home).post(register);
router.route("/activate").post(activateAccount);
router.route("/login").post(login);

module.exports = router;
