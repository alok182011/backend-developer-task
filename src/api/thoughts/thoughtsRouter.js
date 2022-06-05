const express = require("express");
const router = express.Router();

const {
  getAllThoughts,
  postThought,
  getThought,
} = require("./thoughtsController");

router.get("/all", getAllThoughts);
router.post("/", postThought);
router.get("/", getThought);

module.exports = router;
