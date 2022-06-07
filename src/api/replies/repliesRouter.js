const express = require("express");
const router = express.Router();

const { postReply, deleteReply } = require("./repliesController");

const checkAuth = require("../../utility/authChecker");

router.post("/", checkAuth, postReply);
router.delete("/", checkAuth, deleteReply);

module.exports = router;
