const express = require("express");
const router = express.Router();

const { postReply, deleteReply } = require("./repliesController");

const checkAuth = require("../../utility/authChecker");
const validator = require("../../validator/validator");
const { replySchemas } = require("../../validator/schemas");

router.post(
  "/",
  checkAuth,
  validator(replySchemas.postReply, "body"),
  postReply
);
router.delete(
  "/",
  checkAuth,
  validator(replySchemas.deleteReply, "body"),
  deleteReply
);

module.exports = router;
