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
          replies: {
            $size: "$replies",
            // $map: {
            //   input: "$replies",
            //   as: "reply",
            //   in: {
            //     _id: "$$reply._id",
            //     body: "$$reply.body",
            //     anoymous: "$$reply.anoymous",
            //     username: {
            //       $cond: {
            //         if: { $eq: ["$$reply.anoymous", true] },
            //         then: null,
            //         else: "$$reply.username",
            //       },
            //     },
            //   },
            // },
          },
          createdAt: 1,
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
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                body: "$$reply.body",
                anoymous: "$$reply.anoymous",
                username: {
                  $cond: {
                    if: { $eq: ["$$reply.anoymous", true] },
                    then: null,
                    else: "$$reply.username",
                  },
                },
                createdAt: "$$reply.createdAt",
              },
            },
          },
          createdAt: 1,
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
    const { body, anoymous } = req.body;
    const { username, id } = req.decodedToken;

    let newThought = new Thought({
      body,
      user_id: id,
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

const deleteThought = async (req, res, next) => {
  try {
    const { thought_id } = req.body;
    const { username } = req.decodedToken;

    const thought = await Thought.findById(thought_id);

    if (thought.username === username) {
      await thought.delete();
    } else {
      const response = authFailureResponse("Action Not Allowed!!!");
      return res.status(401).json(response);
    }

    const response = successResponse("Thought Deleted!!!");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

module.exports = { getAllThoughts, postThought, getThought, deleteThought };
