const express = require("express");
const router = express.Router();

const { register, login } = require("./authController");
const validator = require("../../validator/validator");
const { authSchemas } = require("../../validator/schemas");

router.post("/login", validator(authSchemas.login, "body"), login);
router.post("/register", validator(authSchemas.register, "body"), register);

module.exports = router;
