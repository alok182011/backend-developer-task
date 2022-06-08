const express = require("express");
const router = express.Router();

const {
  getAllThoughts,
  postThought,
  getThought,
  deleteThought,
} = require("./thoughtsController");

const checkAuth = require("../../utility/authChecker");
const validator = require("../../validator/validator");
const { thoughtSchemas } = require("../../validator/schemas");

router.get("/all", checkAuth, getAllThoughts);
router.post(
  "/",
  checkAuth,
  validator(thoughtSchemas.postThought, "body"),
  postThought
);
router.get(
  "/",
  checkAuth,
  validator(thoughtSchemas.getThought, "query"),
  getThought
);
router.delete(
  "/",
  checkAuth,
  validator(thoughtSchemas.deleteThought, "body"),
  deleteThought
);

module.exports = router;
