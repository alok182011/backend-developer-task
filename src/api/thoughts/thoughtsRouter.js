const express = require("express");
const router = express.Router();

const {
  getAllThoughts,
  postThought,
  getThought,
  deleteThought,
} = require("./thoughtsController");

const checkAuth = require("../../utility/authChecker");

router.get("/all", checkAuth, getAllThoughts);
router.post("/", checkAuth, postThought);
router.get("/", checkAuth, getThought);
router.delete("/", checkAuth, deleteThought);

module.exports = router;
