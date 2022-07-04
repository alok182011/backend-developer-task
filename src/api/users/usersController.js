const Thought = require("../../models/thoughts");
const User = require("../../models/users");

const {
  successResponse,
  internalFailureResponse,
} = require("../../utility/responses");

const getUserThoughts = async (req, res, next) => {
  const { username, limit, offset } = req.query;

  try {
    let thought = await Thought.aggregate([
      { $match: { username: username, anoymous: false } },
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
            $size: "$replies",
          },
          createdAt: 1,
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const response = successResponse(thought);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

const getUsersInfo = async (req, res, next) => {
  const { username } = req.query;
  try {
    let user = await User.aggregate([
      { $match: { username: username } },
      {
        $project: {
          _id: 0,
          username: 1,
          createdAt: 1,
        },
      },
    ]);

    const response = successResponse(user);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

module.exports = { getUsersInfo, getUserThoughts };
