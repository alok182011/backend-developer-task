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

const getAllThoughts = async (req, res, next) => {
  try {
    let thoughts = await Thought.aggregate([
      {
        $project: {
          body: 1,
          anoymous: 1,
          username: {
            $cond: {
              if: { $eq: ["$anoymous", true] },
              then: null,
              else: "$username",
            },
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                _id: "$$comment._id",
                body: "$$comment.body",
                anoymous: "$$comment.anoymous",
                username: {
                  $cond: {
                    if: { $eq: ["$$comment.anoymous", true] },
                    then: null,
                    else: "$$comment.username",
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const response = successResponse(thoughts);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

const getThought = async (req, res, next) => {
  const { thought_id } = req.query;

  try {
    let thought = await Thought.aggregate([
      { $match: { _id: ObjectId(thought_id) } },
      {
        $project: {
          id: 1,
          body: 1,
          anoymous: 1,
          username: {
            $cond: {
              if: { $eq: ["$anoymous", true] },
              then: null,
              else: "$username",
            },
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                _id: "$$comment._id",
                body: "$$comment.body",
                anoymous: "$$comment.anoymous",
                username: {
                  $cond: {
                    if: { $eq: ["$$comment.anoymous", true] },
                    then: null,
                    else: "$$comment.username",
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const response = successResponse(thought);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

const postThought = async (req, res, next) => {
  try {
    const { body, user_id, username, anoymous } = req.body;

    let newThought = new Thought({
      body,
      user_id,
      username,
      anoymous,
      createdAt: new Date().toISOString(),
    });

    await newThought.save();
    const response = successResponse("Thought Posted!!!");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

module.exports = { getAllThoughts, postThought, getThought };
