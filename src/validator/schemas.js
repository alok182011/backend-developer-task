const Joi = require("joi");

const authSchemas = {
  login: Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
  register: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(1).required(),
    password: Joi.string().min(6).required(),
  }),
};

const userSchemas = {
  getUser: Joi.object({
    username: Joi.string().min(1).required(),
  }),
  getUserThoughts: Joi.object({
    username: Joi.string().min(1).required(),
    limit: Joi.number().required(),
    offset: Joi.number().required(),
  }),
};

const thoughtSchemas = {
  getAllThought: Joi.object({
    limit: Joi.number().required(),
    offset: Joi.number().required(),
  }),
  getThought: Joi.object({
    thought_id: Joi.string().hex().length(24).required(),
  }),
  postThought: Joi.object({
    body: Joi.string().min(1).required(),
    anoymous: Joi.boolean().required(),
  }),
  deleteThought: Joi.object({
    thought_id: Joi.string().hex().length(24).required(),
  }),
};

const replySchemas = {
  postReply: Joi.object({
    body: Joi.string().min(1).required(),
    anoymous: Joi.boolean().required(),
    thought_id: Joi.string().hex().length(24).required(),
  }),
  deleteReply: Joi.object({
    thought_id: Joi.string().hex().length(24).required(),
    reply_id: Joi.string().hex().length(24).required(),
  }),
};

module.exports = { authSchemas, userSchemas, thoughtSchemas, replySchemas };
