const express = require("express");
const router = express.Router();

const { getUsersInfo, getUserThoughts } = require("./usersController");

const checkAuth = require("../../utility/authChecker");
const validator = require("../../validator/validator");
const { userSchemas } = require("../../validator/schemas");

router.get(
  "/",
  checkAuth,
  validator(userSchemas.getUser, "query"),
  getUsersInfo
);
router.get(
  "/thoughts",
  checkAuth,
  validator(userSchemas.getUserThoughts, "query"),
  getUserThoughts
);

module.exports = router;
