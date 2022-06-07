const Thought = require("../../models/thoughts");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const {
  successResponse,
  internalFailureResponse,
  notFoundResponse,
  authFailureResponse,
  badRequestResponse,
  conflictResponse,
} = require("../../utility/responses");

const postReply = async (req, res, next) => {
  try {
    const { body, anoymous, thought_id } = req.body;
    const { username, id } = req.decodedToken;

    let newReply = {
      body,
      user_id: id,
      username,
      anoymous,
      createdAt: new Date().toISOString(),
    };

    const thought = await Thought.findById(thought_id);

    if (thought) {
      thought.replies.unshift(newReply);
      await thought.save();
    } else {
      const response = notFoundResponse("Thought not found");
      return res.status(404).json(response);
    }

    const response = successResponse("Reply Posted!!!");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

const deleteReply = async (req, res, next) => {
  try {
    const { thought_id, reply_id } = req.body;
    const { username } = req.decodedToken;

    const thought = await Thought.findById(thought_id);

    if (thought) {
      const replyIndex = thought.replies.findIndex(
        (reply) => reply.id === reply_id
      );

      if (thought.replies[replyIndex].username === username) {
        thought.replies.splice(replyIndex, 1);
        await thought.save();
      } else {
        const response = authFailureResponse("Action Not Allowed!!!");
        return res.status(401).json(response);
      }
    } else {
      const response = notFoundResponse("Thought not found");
      return res.status(404).json(response);
    }

    const response = successResponse("Reply Deleted!!!");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

module.exports = { postReply, deleteReply };
