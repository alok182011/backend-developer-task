const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/users");

const {
  successResponse,
  internalFailureResponse,
  notFoundResponse,
  authFailureResponse,
  badRequestResponse,
  conflictResponse,
} = require("../../utility/responses");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      const response = conflictResponse(
        "User already registered with this username or email."
      );
      return res.status(409).json(response);
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username,
      password: encryptedPassword,
      createdAt: new Date().toISOString(),
    });

    const apiResponse = await newUser.save();

    const token = jwt.sign(
      {
        id: apiResponse.id,
        email: apiResponse.email,
        username: apiResponse.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "365d" }
    );

    let data = {
      username: apiResponse.username,
      id: apiResponse.id,
      email: apiResponse.email,
      token,
    };

    const response = successResponse(data);
    return res.status(200).json(response);
  } catch (err) {
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    let user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      const response = notFoundResponse("User not found");
      return res.status(404).json(response);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const response = authFailureResponse("Wrong Credentials");
      return res.status(401).json(response);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "365d" }
    );

    let data = {
      username: user.username,
      id: user.id,
      email: user.email,
      token,
    };

    const response = successResponse(data);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = internalFailureResponse(err);
    return res.status(500).json(response);
  }
};

module.exports = { register, login };
